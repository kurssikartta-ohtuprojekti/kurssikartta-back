const {getAccountJsPath} = require('./../other/paths')
const path = require('path')

const getAccount = (username) => {
    return require(path.join(path.resolve(), getAccountJsPath())).accounts.find(account => account.username === username)
}

const getNextAccountId = () => {
    return require(path.join(path.resolve(), getAccountJsPath())).accounts.length + 1
}

module.exports = {
    getAccount, getNextAccountId
}