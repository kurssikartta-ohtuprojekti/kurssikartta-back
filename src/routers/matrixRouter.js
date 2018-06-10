const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const { getAccount } = require('./../utils/accountHandler')
const { getCourseMatrixPath } = require('./../other/paths')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile('resources/map.json', (err, obj) => {
        res.json(obj)
    })
})


const validateToken = (token) => {
    if (!token) return { error: 'token missing' }

    try {

        const username = jwt.verify(token, process.env.SECRET).username

        if (!username) return { error: 'token invalid' }
        if (!getAccount(username)) return { error: 'account not found' }

    } catch (e) {
        return { error: 'malformed token' }
    }

    return { msg: 'token ok' }
}

matrixRouter.post('/matrix', (req, res) => {

    const validation = validateToken(req.get('authorization'))
    if (validation.error) {
        return res.status(401).json({ error: validation.error })
    } else {
        console.log('validation', validation.msg)
    }

    const data = req.body

    jsonfile.writeFile(getCourseMatrixPath(), data, (err, obj) => {
        if (err !== null) {
            return res.status(400).json({ error: error })

        } else {
            return res.status(200).json({ msg: "Ok, updated" })
        }

    })

})

matrixRouter.get('/reset', (req, res) => {

    const validationResult = validateToken(req.get('authorization'))
    if (validationResult.error) {
        return res.status(401).json({ error: validationResult.error })
    } else {
        console.log('validation', validationResult.msg)
    }
    console.log('1')

    jsonfile.readFile('resources/map-original.json', (err, obj) => {
        console.log('2')

        jsonfile.writeFile('resources/map.json', obj, () => {
            console.log('3')

            if (err === null) {
                console.log('4')

                return res.status(200).send({ "msg": "Ok, map has been reset" })

            }
        })
    })
})

module.exports = matrixRouter
