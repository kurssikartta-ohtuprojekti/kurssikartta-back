const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const { getAccount } = require('./../utils/accountHandler')
const paths = require('./../other/paths')
const messages = require('./../other/messages')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile(paths.MAP_DEFAULT_LOC, (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })
        }
        return res.status(200).json(obj)
    })
})

matrixRouter.get('/matrix/:id', async (req, res) => {
    jsonfile.readFile(paths.MAP_DEFAULT_LOC, (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })
        }
        const id = req.params.id
        try {
            const map = obj.find(map => {
                return map.id.toString() === id
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
    } else {
        console.log('** validation ** ', validation.msg)
    }

    const data = req.body

    jsonfile.writeFile(paths.getCourseMatrixPath(), data, (err, obj) => {
        if (err) {
            return res.status(500).json({ error: messages.FILE_ERROR })

        } else {
            return res.status(200).json({ msg: messages.UPDATE_DONE })
        }

    })

})

matrixRouter.get('/reset', (req, res) => {

    const validationResult = validateToken(req.get('authorization'))
    if (validationResult.error) {
        return res.status(403).json({ error: validationResult.error })
    } else {
        console.log('** validation ** ', validation.msg)
    }
    console.log('1')

    jsonfile.readFile(paths.MAP_BACKUP_LOC, (err, obj) => {
        console.log('2')

        jsonfile.writeFile(paths.MAP_DEFAULT_LOC, obj, () => {

            if (err === null) {

                return res.status(200).send({ "msg": messages.UPDATE_DONE })

            }
        })
    })
})

module.exports = matrixRouter
