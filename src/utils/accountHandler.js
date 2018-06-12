

const {getAccountJsPath} = require('./../other/paths')

const getAccount = (username) => {
    return require(getAccountJsPath()).accounts.find(account => account.username === username)
}

module.exports = {
    getAccount
}