const express = require('express')
const courseRouter = express.Router()
const jsonfile = require('jsonfile')
const courseInfo = require('./../weboodi/courseInfo')


const prodPath = 'resources/kaikkikurssit.json'
const devPath = 'resources/kaikkikurssit.json'
const testPath = 'resources/kaikkikurssitDummy.json'

const choosePath = () => {
    return (process.env.NODE_ENV === 'production') ? prodPath : (process.env.NODE_ENV === 'development' ? devPath : testPath)
}

courseRouter.get('/courses', (req, res) => {
    jsonfile.readFile(choosePath(), (err, obj) => {
        if (err) {
            console.log('error:', err)
            return
        }

        res.json(obj)
    })
})

courseRouter.get('/courses/:id', (req, res) => {
    jsonfile.readFile(choosePath(), (err, obj) => {
        if (err) {
            console.log('error:', err)
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

