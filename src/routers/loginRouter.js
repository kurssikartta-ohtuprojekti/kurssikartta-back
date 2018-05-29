const express = require('express')
const loginRouter = express.Router()
const { accounts } = require('./../../resources/accounts')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/login', async (req, res) => {
    const dbUserAccount = accounts.find(account => account.username === req.body.username)
    const match = await bcrypt.compare(req.body.password, dbUserAccount.passwordHash)

    if (match) {
        const userForToken = {
            username: dbUserAccount.username,
            id: dbUserAccount.id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(200).send({ token, username: dbUserAccount.username })
    } else {
        return res.status(401).send({ error: 'invalid username or password' })
    }

})

module.exports = loginRouter
