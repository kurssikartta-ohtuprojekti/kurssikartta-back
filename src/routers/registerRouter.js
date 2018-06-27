const express = require('express')
const registerRouter = express.Router()
const messages = require('./../other/messages')
const accountCriteria = require('./../other/accountCriteria')
const bcrypt = require('bcrypt')
const {getAccountByName, saveAccount} = require('../utils/psqlAccountHandler')
const { createToken } = require('./../utils/tokenHandler')


const validatePassword = (password) => {
    return (password !== undefined
        && password.length >= accountCriteria.PW_MIN_LENGTH
        && password.length <= accountCriteria.PW_MAX_LENGTH
        && accountCriteria.PW_REQUIRED_REGEXES.every(regex => password.matches(regex)))
}

const validateUsername = (username) => {
    return (username !== undefined
        && username.length >= accountCriteria.USERNAME_MIN_LENGTH
        && password.length <= accountCriteria.USERNAME_MIN_LENGTH
        && accountCriteria.USERNAME_REQUIRED_REGEXES.every(regex => username.matches(regex)))
}

registerRouter.post('/register', async (req, res) => {

    if (req.password === undefined || req.username === undefined) return res.status(400).json({ error: messages.NO_USERNAME_OR_PASSWORD })
    
    const password = req.password
    const username = req.username

    if (!validatePassword(password)) return res.status(400).json({ error: messages.PW_MIN_CRITERIA_NOT_MET })
    if (!validateUsername(username)) return res.status(400).json({ error: messages.USERNAME_MIN_CRITERIA_NOT_MET })

    // HUOM lisää regexit usernamen validoimiseksi
    if (getAccountByName(username)) return { error: messages.USERNAME_TAKEN }

    const passwordHash = await bcrypt.hash(password, accountCriteria.SALT_ROUNDS)

    const newAccount = {
           // id: getNextAccountId(),
            username: username,
            passwordhash: passwordHash,
            role: 'user'
    }
    saveAccount(newAccount)
    const token = createToken(newAccount)
    res.status(201).send({ token, username: newAccount.username, role: newAcccount.role })

})

module.exports = registerRouter
