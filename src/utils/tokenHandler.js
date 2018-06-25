const jwt = require('jsonwebtoken')



const createToken = (account) => {
    
    return jwt.sign({ username: account.username, role: account.role }, process.env.SECRET)
}

const validateToken = async (token) => {

    try {
        console.log('2.1')
        const decoded = await jwt.verify(token, process.env.SECRET)
        console.log('decoded: ', decoded)
        return decoded

    } catch (err) {
        return undefined
    }

}

module.exports = {
    createToken, validateToken
}