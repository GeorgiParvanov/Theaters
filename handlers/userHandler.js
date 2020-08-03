const userModel = require('../models/User')
const jwt = require('../utils/jwt')
const { cookie } = require('../config/config')
const { validationResult } = require('express-validator')


module.exports = {
    get: {
        login(req, res, next) {
            res.render('user/login.hbs')
        },

        register(req, res, next) {
            res.render('user/register.hbs')
        },

        logout(req, res, next) {
            req.user = null

            res.clearCookie(cookie)
                .redirect('/home/')
        }
    },
    post: {
        async login(req, res, next) {
            const { username, password } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('user/login.hbs', {
                    isLoggedIn: false,
                    message: errors.array()[0].msg,
                    oldInput: { username, password }
                })
            }

            const user = await userModel.findByUsername(username)

            const token = jwt.createToken(user)

            res.status(201)
                .cookie(cookie, token, { maxAge: 3600000 })
                .redirect('/home/')
        },
        async register(req, res, next) {
            const { username, password, repeatPassword } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('user/register.hbs', {
                    isLoggedIn: false,
                    message: errors.array()[0].msg,
                    oldInput: { username, password, repeatPassword }
                })
            }

            await userModel.createUser({ username, password })
            res.redirect('/user/login')
        }
    }
}