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
          return  res.status(400).send({"error": error})

        } else {
            console.log('here')
          return  res.status(200).send({"msg": "Ok, updated"})
        }

    })
})

module.exports = matrixRouter
