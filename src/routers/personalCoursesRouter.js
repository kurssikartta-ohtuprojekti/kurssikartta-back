const express = require('express')
const personalCoursesRouter = express.Router()
const { validateToken } = require('./../utils/tokenHandler')
const { updateAccountCoursesByName } = require('../utils/psqlAccountHandler')
const { getAccountByName } = require('../utils/psqlAccountHandler')
const messages = require('./../other/messages')

const handleAuthentication = async (req, res) => {

    if (req.get('authorization') === undefined) {
        res.status(403).json({ error: messages.NO_TOKEN })
        return false
    }

    const decoded = await validateToken(req.get('authorization'))

    if (decoded === false) {
        res.status(403).json({ error: messages.UNAUTHROZED_ACTION })
        return false
    }

    return decoded
}



personalCoursesRouter.post('/my_courses', async (req, res) => {

    const decoded = await handleAuthentication(req, res)

    if (!decoded) return

   // console.log('decoded: ', decoded)
   // console.log('body: ', req.body)
    const username = decoded.username
   // console.log('username: ', username)
   // console.log('courses: ', req.body.courses)
    await updateAccountCoursesByName(username, req.body.courses)
    const account = await getAccountByName(username)
    return res.status(200).json({username: account.username, role: account.role, courses: account.courses})

})

personalCoursesRouter.get('/my_courses', async (req, res) => {
    const decoded = await handleAuthentication(req, res)

  //  console.log('decoded: ', decoded)

    if (!decoded) return
    const username = decoded.username

  //  console.log('username: ', username)
    const account = await getAccountByName(username)
    return res.status(200).json({username: account.username, role: account.role, courses: account.courses})

})





module.exports = personalCoursesRouter
