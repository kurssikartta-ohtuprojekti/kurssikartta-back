const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const { getAccount } = require('./../utils/accountHandler')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile('resources/map.json', (err, obj) => {
        res.json(obj)
    })
})


const validateToken = (token) => {
    if (!token) return { error: 'user token missing' }

    try {

    
    const username = jwt.verify(token, process.env.SECRET).username
    } catch (e) {
        return { error: 'malformed token' }
    }
    if (!username) return { error: 'user token invalid' }

    if (!getAccount(username)) return { error: 'account not found' }

    return { msg: 'token ok' }
}

matrixRouter.post('/matrix', (req, res) => {

    const validationResult = validateToken(req.get('authorization'))
    if (validationResult.error) {
        return res.status(401).json({ error: validationResult.error })
    } else {
        console.log('validation', validationResult.msg)
    }

    const data = req.body
    // console.log('body', req.body)
    // console.log('data', data)
    jsonfile.writeFile('resources/map.json', data, (err, obj) => {
        console.log('err:', err)
        console.log('obj: ', obj)
        if (err !== null) {
            console.log('err', err)
            return res.status(400).json({ error: error })

        } else {
            //   console.log('here')
            return res.status(200).send({ "msg": "Ok, updated" })
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
