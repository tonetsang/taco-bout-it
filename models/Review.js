const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {        //eric - cloudinary objects for posting review images
    type: String,
    require: true,
  },
  cloudinaryId: { //eric - cloudinary object for posting images
    type: String,
    require: true,
  },
  review:{
    type: String,
  },
   address:{
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  email: { //r.r added this 
    type: String,
    require: true,
  },
  password: { //r.r added this
    type: String,
    require: true,
  },
  creatorId: { 
     type: String,
     required: true
   },
  userName:{
    type: String
  },
  likes:{
    type: Number
  }
})

module.exports = mongoose.model('reviews', reviewSchema)
