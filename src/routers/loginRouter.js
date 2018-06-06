const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prodPath = './../../resources/accounts'
const devPath = './../../resources/accounts'
const testPath = './../../tests/data/testAccounts'
const cors = require('cors')

const choosePath = () => {
    return (process.env.NODE_ENV === 'production') ? prodPath : (process.env.NODE_ENV === 'development' ? devPath : testPath)
}

const validateLogin = async (username, password) => {

    const account = require(choosePath()).accounts.find(account => account.username === username)

    return (account !== undefined && await bcrypt.compare(password, account.passwordHash))
}

loginRouter.post('/login', cors(), async (req, res) => {
    if (req.body.username == undefined || req.body.password == undefined) {

        return res.status(401).send({ error: 'username or password missing' })
    }

    if (await validateLogin(req.body.username, req.body.password)) {

        const token = jwt.sign({ username: req.body.username, }, process.env.SECRET)

        res.status(200).send({ token, username: req.body.username })

    } else {

        return res.status(401).send({ error: 'invalid username or password' })
    }

})

loginRouter.post('/account/reset', async (req, res) => {
    /* const dbUserAccount = await validateLogin(req.body.username, req.body.password)
     if (dbUserAccount) {
 
     } else {
         return res.status(401).send({ error: 'invalid username or password' })
     }
 */
})

module.exports = loginRouter
