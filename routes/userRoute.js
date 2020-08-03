const router = require('express').Router()
const handler = require('../handlers/userHandler')
const authenticate = require('../utils/authenticator')
const validateRegister = require('../utils/validator').register;
const validateLogin = require('../utils/validator').Login;

router.get('/login', handler.get.login)
router.get('/register', handler.get.register)
router.get('/logout', authenticate(), handler.get.logout)

router.post('/login', validateLogin, handler.post.login)
router.post('/register', validateRegister, handler.post.register)

module.exports = router