const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const { getAccount } = require('./../utils/accountHandler')
const { getAccountByName } = require('../utils/psqlAccountHandler')
const { createToken } = require('./../utils/tokenHandler')
const messages = require('./../other/messages')


loginRouter.post('/login', async (req, res) => {

    

    if (req.body.username == undefined || req.body.password == undefined) {
        return res.status(401).send({ error: messages.NO_USERNAME_OR_PASSWORD })
    }


    const account = await getAccountByName(req.body.username)

    if (account !== undefined && await bcrypt.compare(req.body.password, account.passwordhash)) {

        const token = createToken(account)

        res.status(200).send({ token, username: account.username, role: account.account })

    } else {

        return res.status(401).send({ error: messages.INVALID_USERNAME_OR_PASSWORD })
    }

})

loginRouter.post('/logout', async (req, res) => {
    const token = req.get('authorization')
})

module.exports = loginRouter
