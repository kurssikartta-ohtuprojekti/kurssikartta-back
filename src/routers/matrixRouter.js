const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const paths = require('./../other/paths')
const messages = require('./../other/messages')
const { inputDataForUpdateIsValid, inputDataForCreationIsValid } = require('./../utils/courseMapMarixValidator')
const { validateToken } = require('./../utils/tokenHandler')

const parse = (string) => {
    const int = parseInt(string, 10) // 10 = decimal system

    if (int === undefined || isNaN(int)) {
        return -1
    } else
        return int
}

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile(paths.getCourseMatrixJsonPath(), (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })
        }
        return res.status(200).json(obj)
    })
})

matrixRouter.get('/matrix/:id', async (req, res) => {
    const id = parse(req.params.id)

    if (id === -1) return res.status(400).json({ error: messages.ID_MISSING_OR_INCORRECT })


    jsonfile.readFile(paths.getCourseMatrixJsonPath(), (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })
        }
        try {
            const map = obj.find(item => {
                return item.id === id
            })
            if (map === undefined) {
                return res.status(404).json({ error: messages.NOT_FOUND })
            }

            return res.status(200).json(map)


        } catch (e) {
            return res.status(500).json({ error: messages.FILE_INCORRECT_FORMAT })
        }
    })
})



const handleAdminAuthentication = async (req, res) => {

    if (req.get('authorization') === undefined) {
        res.status(403).json({ error: messages.NO_TOKEN })
        return false
    }

    const decoded = await validateToken(req.get('authorization'))

    if (decoded === false || decoded.role !== 'admin') {
        res.status(403).json({ error: messages.UNAUTHROZED_ACTION })
        return false
    }

    return true
}

matrixRouter.post('/matrix', async (req, res) => {

    if (! await handleAdminAuthentication(req, res)) return


    if (!inputDataForCreationIsValid(req.body)) {
        return res.status(400).json({ error: messages.DATA_INCORRECT_FORMAT })
    }

    var entry = req.body

    jsonfile.readFile(paths.getCourseMatrixJsonPath(), (err, obj) => {
        if (err) return res.status(500).json({ error: messages.FILE_ERROR })

        /* toteutus tasoa tyhmä. keksi jotain fiksumpaa kun kerkeät*/
        var index = 0
        while (true) {
            let id = (obj[index] !== undefined) ? obj[index].id : index
            if (index < id || (obj[index] === undefined)) {
                entry.id = index
                obj.splice(index, 0, entry)
                break
            } else
                index++
        }

        jsonfile.writeFile(paths.getCourseMatrixJsonPath(), obj, (err) => {
            if (err) return res.status(500).json({ error: messages.FILE_ERROR })
            else {
                return res.status(201).json(entry)
            }
        })

    })

})

matrixRouter.post('/matrix/:id', async (req, res) => {

    if (! await handleAdminAuthentication(req, res)) return

    const id = parse(req.params.id)


    if (id === -1) {
        return res.status(400).json({ error: messages.ID_MISSING_OR_INCORRECT })
    }
    if (!inputDataForUpdateIsValid(id, req.body)) {
        return res.status(400).json({ error: messages.DATA_INCORRECT_FORMAT })
    }



    jsonfile.readFile(paths.getCourseMatrixJsonPath(), (err, obj) => {
        if (err) return res.status(500).json({ error: messages.FILE_ERROR })


        try {
            var index = obj.findIndex(item => {
                return (item.id !== undefined && item.id === id)
            })

        } catch (e) {
            return res.status(500).json({ error: messages.FILE_INCORRECT_FORMAT })
        }

        if (index === -1) {
            return res.status(404).json({ error: messages.NOT_FOUND })
        } else {
            obj[index] = req.body
        }

        jsonfile.writeFile(paths.getCourseMatrixJsonPath(), obj, (err) => {
            if (err) return res.status(500).json({ error: messages.FILE_ERROR })
            else {
                return res.status(200).json({ msg: messages.UPDATE_DONE })
            }
        }
        )
    })
})

matrixRouter.delete('/matrix/:id', async (req, res) => {

    if (! await handleAdminAuthentication(req, res)) return


    const id = parse(req.params.id)

    if (id === -1) {
        return res.status(400).json({ error: messages.ID_MISSING_OR_INCORRECT })
    }



    jsonfile.readFile(paths.getCourseMatrixJsonPath(), (err, obj) => {
        if (err) return res.status(500).json({ error: messages.FILE_ERROR })


        try {
            var index = obj.findIndex(item => {
                return (item.id !== undefined && item.id === id)
            })

        } catch (e) {
            return res.status(500).json({ error: messages.FILE_INCORRECT_FORMAT })
        }

        if (index === -1) {
            return res.status(404).json({ error: messages.NOT_FOUND })

        }
        obj.splice(index, 1)

        jsonfile.writeFile(paths.getCourseMatrixJsonPath(), obj, (err) => {
            if (err) return res.status(500).json({ error: messages.FILE_ERROR })
            else {
                return res.status(204).send()
            }
        }
        )
    })
})


matrixRouter.get('/reset', async (req, res) => {

    const authedRequest = await handleAdminAuth(req, res)
    if (!authedRequest) return

    jsonfile.readFile(paths.MAP_BACKUP_PATH, (err, obj) => {
        console.log('2')

        jsonfile.writeFile(paths.getCourseMatrixJsonPath(), obj, () => {

            if (err === null) {

                return res.status(200).send({ msg: messages.UPDATE_DONE })

            }
        })
    })
})

module.exports = matrixRouter
