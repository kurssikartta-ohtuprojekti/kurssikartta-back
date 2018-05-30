const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const validateLogin = async (username, password) => {
    
    if (process.env.NODE_ENV === 'development') {
        const dbUserAccount = require('./../../resources/accounts').accounts.find(account => account.username === username)
        return (dbUserAccount !== undefined && await bcrypt.compare(password, dbUserAccount.passwordHash))
    }
    if (process.env.NODE_ENV === 'test') {
        const dbUserAccount = require('./../../tests/data/testAccounts').accounts.find(account => account.username === username)
        return (dbUserAccount !== undefined && await bcrypt.compare(password, dbUserAccount.passwordHash))
    }

}

loginRouter.post('/login', async (req, res) => {

    const dbUserAccount = await validateLogin(req.body.username, req.body.password)
    if (dbUserAccount) {

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
