const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {getAccount} = require('./../utils/accountHandler')
const messages = require('./../other/messages')

const validateLogin = async (username, password) => {

    const account = getAccount(username)

    return (account !== undefined && await bcrypt.compare(password, account.passwordHash))
}

loginRouter.post('/login', async (req, res) => {
    if (req.body.username == undefined || req.body.password == undefined) {

        return res.status(401).send({ error: messages.NO_USERNAME_OR_PASSWORD })
    }

    if (await validateLogin(req.body.username, req.body.password)) {

        const token = jwt.sign({ username: req.body.username, }, process.env.SECRET)

        res.status(200).send({ token, username: req.body.username })

    } else {

        return res.status(401).send({ error: messages.INVALID_USERNAME_OR_PASSWORD })
    }

})


module.exports = loginRouter
