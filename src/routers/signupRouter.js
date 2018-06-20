const express = require('express')
const matrixRouter = express.Router()
const jsonfile = require('jsonfile')
const jwt = require('jsonwebtoken')
const paths = require('./../other/paths')
const messages = require('./../other/messages')
const passwordCriteria = require('./other/passwordCriteria')



const validatePassword = (password) => {
    return (password !== undefined
        && password.length >= passwordCriteria.MIN_LENGTH
        && password.length <= passwordCriteria.MAX_LENGTH
        && passwordCriteria.REGEXES.every(regex => password.matches(regex)))
}

signupRouter.post('/signup', async (req, res) => {

    if (req.password === undefined || req.username === undefined) return res.status(400).json({ error: messages.NO_USERNAME_OR_PASSWORD })

    const password = req.password

    if (!validatePassword(password)) return res.status(400).json({ error: messages.PW_MIN_CRITERIA_NOT_MET })


})