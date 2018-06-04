const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile('resources/map.json', (err, obj) => {
        res.json(obj)
    })
})

matrixRouter.post('matrix', async (req, res) => {
    const data = req.data

    jsonfile.writeFile('resources/map.json', data, (err, obj) => {
        if (err) {
            res.status(400).end

        } else {
            res.status(200).end
        }

    })
})

module.exports = matrixRouter
