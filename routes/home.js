const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const todosController = require('../controllers/reviews')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex) 

router.get('/feed', ensureAuth, todosController.getAllReviews )

router.get('/viewfeed', ensureGuest, todosController.getAllReviewsGuest )

module.exports = router