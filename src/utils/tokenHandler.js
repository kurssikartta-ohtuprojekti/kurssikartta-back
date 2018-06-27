const jwt = require('jsonwebtoken')



const createToken = (account) => {

    const expTime = process.env.LOGIN_EXPIRATION_TIME || '1h' 

    return jwt.sign({ username: account.username, role: account.role }, process.env.SECRET, {expiresIn: expTime})
}

const validateToken = async (token) => {

    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        return decoded

    } catch (err) {
        console.log(err)
        return false
    }

}

module.exports = {
    createToken, validateToken
}