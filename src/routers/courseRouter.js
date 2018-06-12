const express = require('express')
const courseRouter = express.Router()
const jsonfile = require('jsonfile')
const courseInfo = require('./../weboodi/courseInfo')
const { getCourseJsonPath } = require('./../other/paths')
const messages = require('./../other/messages')

courseRouter.get('/courses', (req, res) => {
    jsonfile.readFile(getCourseJsonPath(), (err, obj) => {
        if (err) {
            console.log('error: ', err)
            return res.status(500).json({error: messages.FILE_INCORRECT_FORMAT})
        }
        //   console.log('/courses, obj', obj)
        res.json(obj)
    })
})

courseRouter.get('/courses/:id', (req, res) => {
    jsonfile.readFile(getCourseJsonPath(), (err, obj) => {
        if (err) {
            console.log('error: ', err)
            return status(500).json({error : messages.FILE_INCORRECT_FORMAT})
        }

        const id = req.params.id
        const course = obj.find(item => item.code === id)
        if (course) {
            res.json(course)
        } else {
            res.status(404).json({ error: messages.NOT_FOUND })
        }

    })

})

courseRouter.get('/courses/info/:id', (req, res) => {
    const info = courseInfo.getCourseInfo(req.params.id)

    info.then((result) => {
        console.log('info', info)
        res.json(result)
    }).catch(() => {
        res.status(404).end()
    })

})

module.exports = courseRouter

