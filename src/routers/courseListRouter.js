const express = require('express')
const courseListRouter = express.Router()
const messages = require('./../other/messages')
const { validateToken } = require('./../utils/tokenHandler')
const CourseUpdate = require('./../utils/courseUpdate')

var sheetsID = process.env.SHEETSID;

const handleAdminAuthentication = async (req, res) => {
    if (req.body.authorization === undefined) {
        res.status(403).json({ error: messages.NO_TOKEN })
        return false
    }

    const decoded = await validateToken(req.body.authorization)

    if (decoded === false || decoded.role !== 'admin') {
        res.status(403).json({ error: messages.UNAUTHROZED_ACTION })
        return false
    }

    return true
}

courseListRouter.post('/update', async (req, res) => {
    if (! await handleAdminAuthentication(req, res)) return

    var sheet = 1,
        url = 'https://spreadsheets.google.com/feeds/list/' + sheetsID + '/' + sheet + '/public/values?alt=json';


    return CourseUpdate(res, url);
})

courseListRouter.post('/updateadress', async (req, res) => {

    if (! await handleAdminAuthentication(req, res)) return

    try {
        process.env.SHEETSID = req.body.id + '';
    } catch (err) {
        return res.status(400).json({ error: messages.FILE_ERROR });
    }
    sheetsID = process.env.SHEETSID;

    return res.status(200).send();
})

courseListRouter.get('/updateid', async (req, res) => {
    return sheetsID;
})


module.exports = courseListRouter
