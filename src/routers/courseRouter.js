const express = require('express')
const courseRouter = express.Router()
const jsonfile = require('jsonfile')
const courseInfo = require('./../weboodi/courseInfo')
const {getCourseJsonPath} = require('./../other/paths')


courseRouter.get('/courses', (req, res) => {
    jsonfile.readFile(getCourseJsonPath(), (err, obj) => {
        if (err) {
            console.log('error: ', err)
            return
        }
     //   console.log('/courses, obj', obj)
        res.json(obj)
    })
})

courseRouter.get('/courses/:id', (req, res) => {
    jsonfile.readFile(getCourseJsonPath(), (err, obj) => {
        if (err) {
            console.log('error: ', err)
            return
        }

        const id = req.params.id
        const course = obj.find(item => item.code === id)
        if (course) {
            res.json(course)
        } else {
            res.status(404).end()
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

