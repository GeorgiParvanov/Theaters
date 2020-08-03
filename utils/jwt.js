const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports = {
    createToken(data) {
        return jwt.sign({ _id: data._id }, secret, { expiresIn: '9999h' })
    },
    verifyToken(token) {
        try {
            const verifiedToken = jwt.verify(token, secret)
            return verifiedToken
        } catch (error) {
            return undefined
        }
    }
}