const express = require('express')
const registerRouter = express.Router()
const messages = require('./../other/messages')
const accountCriteria = require('./../other/accountCriteria')
const bcrypt = require('bcrypt')
const { getAccountByName, saveAccount } = require('../utils/psqlAccountHandler')
const { createToken } = require('./../utils/tokenHandler')


const validatePassword = (password) => {
    console.log('1.1')
    console.log('pw: ', password)
    return (password !== undefined
        && password.length >= accountCriteria.PW_MIN_LENGTH
        && password.length <= accountCriteria.PW_MAX_LENGTH
        && accountCriteria.PW_REQUIRED_REGEXES.every(regex => password.match(regex)))
}

const validateUsername = (username) => {
    return (username !== undefined
        && username.length >= accountCriteria.USERNAME_MIN_LENGTH
        && username.length <= accountCriteria.USERNAME_MAX_LENGTH
        && accountCriteria.USERNAME_REQUIRED_REGEXES.every(regex => username.match(regex)))
}

registerRouter.post('/register', async (req, res) => {
    console.log('pw:', req.body.password)
    console.log('username:', req.body.username)

    if (req.body.password === undefined || req.body.username === undefined) return res.status(400).json({ error: messages.NO_USERNAME_OR_PASSWORD })

    const password = req.body.password
    const username = req.body.username
    console.log('1')

    if (!validatePassword(password)) return res.status(400).json({ error: messages.PW_MIN_CRITERIA_NOT_MET })
    if (!validateUsername(username)) return res.status(400).json({ error: messages.USERNAME_MIN_CRITERIA_NOT_MET })
    console.log('2')

    if (await getAccountByName(username)) return { error: messages.USERNAME_TAKEN }

    const passwordHash = await bcrypt.hash(password, accountCriteria.SALT_ROUNDS)

    const newAccount = {
        username: username,
        passwordhash: passwordHash,
        role: 'user'
    }
    await saveAccount(newAccount) // add error handling!
    const token = createToken(newAccount)
    return res.status(201).send({ token, username: newAccount.username, role: newAccount.role, courses: newAccount.courses })

})

module.exports = registerRouter
