const jwt = require('./jwt')
const { User } = require('../models/User')
const { cookie } = require('../config/config')

// TODO: should this file be called like that and should it be in a different folder like 'Middlewares'?

module.exports = (justContinue = false) => {
    return async function(req, res, next) {
        const token = req.cookies[cookie] || ''

        const verifiedToken = jwt.verifyToken(token)

        if (!verifiedToken) {
            if(justContinue){
                next()
                return
            }
            return res.redirect('/user/login')
        }

        const user = await User.findById(verifiedToken._id)

        req.user = user
        next()
    }
}
