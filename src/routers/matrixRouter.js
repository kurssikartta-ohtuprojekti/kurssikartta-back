const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')

matrixRouter.get('/matrix', async (req, res) => {
    jsonfile.readFile('resources/map.json', (err, obj) => {
        res.json(obj)
    })
})
module.exports = matrixRouter
