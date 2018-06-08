const prodPath = './../../resources/accounts'
const devPath = './../../resources/accounts'
const testPath = './../../tests/data/testAccounts'

const choosePath = () => {
    return (process.env.NODE_ENV === 'production') ? prodPath : (process.env.NODE_ENV === 'development' ? devPath : testPath)
}

const getAccount = (username) => {
    return require(choosePath()).accounts.find(account => account.username === username)
}

module.exports = {
    getAccount
}