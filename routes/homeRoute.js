const router = require('express').Router()
const handler = require('../handlers/homeHandler')
const authenticate = require('../utils/authenticator')

router.get('/', authenticate(true), handler.get.home)

module.exports = router