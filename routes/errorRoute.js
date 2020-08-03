const router = require('express').Router()
const handler = require('../handlers/errorHandler')
const authenticate = require('../utils/authenticator')

router.get('/', authenticate(true), handler.get.notFound)

module.exports = router