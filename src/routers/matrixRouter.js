const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile('resources/map.json', (err, obj) => {
        res.json(obj)
    })
})

matrixRouter.post('/matrix', (req, res) => {
    const data = req.body
    // console.log('body', req.body)
    // console.log('data', data)
    jsonfile.writeFile('resources/map.json', data, (err, obj) => {
        console.log('err:', err)
        console.log('obj: ', obj)
        if (err !== null) {
            console.log('err', err)
            return res.status(400).send({ "error": error })

        } else {
            console.log('here')
            return res.status(200).send({ "msg": "Ok, updated" })
        }

    })
})
matrixRouter.get('/reset', (req, res) => {
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
