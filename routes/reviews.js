const express = require('express')
const router = express.Router()

const upload = require("../middleware/multer"); //cloudinary image API - eric
const reviewsController = require('../controllers/reviews') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, reviewsController.getReviews)

router.get('/getAllReviews', ensureAuth, reviewsController.getAllReviews)

router.post('/createReview', ensureAuth, upload.single("file"), reviewsController.createReview)



router.delete('/deleteReview', ensureAuth, reviewsController.deleteReview)

router.get('/resume/:id', ensureAuth, reviewsController.renderResume)

router.put('/addLike', ensureAuth, reviewsController.addLike)



module.exports = router