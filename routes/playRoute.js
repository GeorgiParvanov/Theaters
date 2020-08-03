const router = require('express').Router()
const handler = require('../handlers/playHandler')
const authenticate = require('../utils/authenticator')
const validateCreate = require('../utils/validator').play;

router.get('/create', authenticate(), handler.get.createPlay)
router.get('/details/:id', authenticate(), handler.get.details)
router.get('/like/:id', authenticate(), handler.get.likePlay)
router.get('/delete/:id', authenticate(), handler.get.deletePlay)
router.get('/edit/:id', authenticate(), handler.get.editPlay)
router.get('/sortByDate', authenticate(), handler.get.sortByDate)
router.get('/sortByLikes', authenticate(), handler.get.sortByLikes)


router.post('/create', authenticate(), validateCreate, handler.post.createPlay)
router.post('/edit/:id', authenticate(), handler.post.editPlay)

module.exports = router