const express = require('express')
const registerRouter = express.Router()
const messages = require('./../other/messages')
const accountCriteria = require('./../other/accountCriteria')
const bcrypt = require('bcrypt')
const { getAccountByName, saveAccount, deleteAccount } = require('../utils/psqlAccountHandler')
const { createToken } = require('./../utils/tokenHandler')
const { validateToken } = require('./../utils/tokenHandler')
const axios = require('axios');



const validatePassword = (password) => {

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
    if (req.body.password === undefined || req.body.username === undefined) return res.status(400).json({ error: messages.NO_USERNAME_OR_PASSWORD })

    if (! await verifyHumanity(req, res)) {
        return res.status(400).json({ error: messages.NOT_HUMAN })
    }

    const password = req.body.password
    const username = req.body.username

    if (!validatePassword(password)) return res.status(400).json({ error: messages.PW_MIN_CRITERIA_NOT_MET })
    if (!validateUsername(username)) return res.status(400).json({ error: messages.USERNAME_MIN_CRITERIA_NOT_MET })

    if (await getAccountByName(username)) return { error: messages.USERNAME_TAKEN }

    const passwordHash = await bcrypt.hash(password, accountCriteria.SALT_ROUNDS)

    const newAccount = {
        username: username,
        passwordhash: passwordHash,
        role: 'user'
    }
    await saveAccount(newAccount)
    const token = createToken(newAccount)
    return res.status(201).send({ token, username: newAccount.username, role: newAccount.role, courses: newAccount.courses })

})

registerRouter.post('/register/delete', async (req, res) => {

    // if (! await handleAdminAuthentication(req, res)) return

    if (req.body.username == undefined || req.body.password == undefined) {
        return res.status(401).send({ error: messages.NO_USERNAME_OR_PASSWORD })
    }

    const account = await getAccountByName(req.body.username)
    // console.log(account)

    if (account !== undefined) {
        if (await bcrypt.compare(req.body.password, account.passwordhash)) {
            await deleteAccount(account)
            // console.log("deleted")
            return res.status(204).send()
        } else {
            return res.status(401).send({ error: messages.INVALID_USERNAME_OR_PASSWORD })
        }
    } else {
        res.status(400).json({ error: messages.ACCOUNT_NOT_FOUND })
    }
})

const handleAdminAuthentication = async (req, res) => {

    if (req.get('authorization') === undefined) {
        res.status(403).json({ error: messages.NO_TOKEN })
        return false
    }

    const decoded = await validateToken(req.get('authorization'))

    if (decoded === false || decoded.role !== 'admin') {
        res.status(403).json({ error: messages.UNAUTHROZED_ACTION })
        return false
    }

    return true
}

const verifyHumanity = async (req) => {

    const response = await axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
            secret: process.env.CAPTCHASECRET,
            response: req.body.reCaptchaResponse,
        }
    });

    // console.log(response.data)

    if (response.data.success) {
        return true;
    } else {
        return false;
    }
}

module.exports = registerRouter
