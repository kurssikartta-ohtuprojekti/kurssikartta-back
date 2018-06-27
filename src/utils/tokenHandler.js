const jwt = require('jsonwebtoken')



const createToken = (account) => {

    const expTime = process.env.LOGIN_EXPIRATION_TIME || '1h' 

    return jwt.sign({ username: account.username, role: account.role }, process.env.SECRET, {expiresIn: expTime})
}

const validateToken = async (token) => {

    try {
        //console.log('2.1')
        const decoded = await jwt.verify(token, process.env.SECRET)
      //  console.log('decoded: ', decoded)
        return decoded

    } catch (err) {
        return false
    }

}

module.exports = {
    createToken, validateToken
}