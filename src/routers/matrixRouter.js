const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const { getAccount } = require('./../utils/accountHandler')
const paths = require('./../other/paths')
const messages = require('./../other/messages')

const parse = (string) => {
    const int = parseInt(string, 10)

    if (int === undefined || isNaN(int)) {
        return -1
    } else
        return int
}

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile(paths.getCourseMatrixPath(), (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })
        }
        return res.status(200).json(obj)
    })
})

matrixRouter.get('/matrix/:id', async (req, res) => {
    const id = parse(req.params.id)

    if (id === -1) return res.status(400).json({ error: messages.DATA_INCORRECT_FORMAT })


    jsonfile.readFile(paths.getCourseMatrixPath(), (err, obj) => {
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

const validateToken = (token) => {
    if (!token) return { error: messages.NO_TOKEN }

    try {

        const username = jwt.verify(token, process.env.SECRET).username

        if (!username) return { error: messages.INVALID_TOKEN }
        if (!getAccount(username)) return { error: messages.ACCOUNT_NOT_FOUND }

    } catch (e) {
        return { error: messages.INVALID_TOKEN }
    }

    return { msg: messages.VALID_TOKEN }
}

matrixRouter.post('/matrix', (req, res) => {

    const validation = validateToken(req.get('authorization'))
    if (validation.error) {
        return res.status(403).json({ error: validation.error })
    }

    const data = req.body

    jsonfile.writeFile(paths.getCourseMatrixPath(), data, (err) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })

        } else {
            return res.status(200).json({ msg: messages.UPDATE_DONE })
        }

    })

})

matrixRouter.post('/matrix/:id', (req, res) => {

    const validation = validateToken(req.get('authorization'))

    if (validation.error) {
        return res.status(403).json({ error: validation.error })
    }
    const id = parse(req.params.id)

    if (req.body.id === undefined || req.body.name == undefined || req.body.matrice === undefined || id === -1) {
        return res.status(400).json({ error: messages.DATA_INCORRECT_FORMAT })
    }



    jsonfile.readFile(paths.getCourseMatrixPath(), (err, obj) => {
        if (err) return res.status(500).json({ error: messages.FILE_ERROR })


        try {
            var index = obj.findIndex(item => {
                return (item.id !== undefined && item.id === id)
            })

        } catch (e) {
            return res.status(500).json({ error: messages.FILE_INCORRECT_FORMAT })
        }

        if (index === -1) {
            obj.push(req.body)
        } else {
            obj[index] = req.body
        }

        jsonfile.writeFile(paths.getCourseMatrixPath(), obj, (err) => {
            if (err) return res.status(500).json({ error: messages.FILE_ERROR })
            else {
                return res.status(200).json({ msg: messages.UPDATE_DONE })
            }
        }
        )
    })
})


matrixRouter.get('/reset', (req, res) => {

    const validation = validateToken(req.get('authorization'))
    if (validation.error) {
        return res.status(403).json({ error: validation.error })
    } else {
        console.log('** validation ** ', validation.msg)
    }
    console.log('1')

    jsonfile.readFile(paths.MAP_BACKUP_LOC, (err, obj) => {
        console.log('2')

        jsonfile.writeFile(paths.getCourseMatrixPath(), obj, () => {

            if (err === null) {

                return res.status(200).send({ "msg": messages.UPDATE_DONE })

            }
        })
    })
})

module.exports = matrixRouter
