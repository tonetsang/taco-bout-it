const Review = require('../models/Review')
const cloudinary = require("../middleware/cloudinary"); //cloudinary posting lines - from eric
//const Review = require("../models/Review"); //cloudinary posting lines from eric

module.exports = {

    getReviews: async (req,res)=>{
        console.log(req.user)
        try{
           
            const reviews = await Review.find({ creatorId: req.user._id})
                                         .sort({likes:-1})
            
            res.render('reviews.ejs', {reviews: reviews, 
                                       user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    getAllReviews: async (req,res)=>{
        console.log(req.user)
        try{
            
            const reviews = await Review.find().sort({likes: -1})
            
            res.render('feed.ejs', {reviews: reviews, 
                                  
                                    user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    getAllReviewsGuest: async (req,res)=>{
        console.log(req.user)
        try{
            
            const reviews = await Review.find().sort({likes: -1})
            
            res.render('viewfeed.ejs', {reviews: reviews, 
                                  
                                    user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    createReview: async (req, res)=>{
       //console.log(req.body)
       //console.log(req.file)

        //conexion with cloudinary
        result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result)

        try{
            await Review.create({name: req.body.name, 
                               completed: false, 
                               creatorId: req.user._id,
                               review: req.body.review,
                               address: req.body.address,
              
                               userName: req.user.userName,

                               image: result.secure_url,
                               cloudinaryId: result.public_id,
                               })

            console.log('Review has been added!')
            res.redirect('/reviews')
        }catch(err){
            console.log(err)
        }
    },
 
    deleteReview: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Review.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Review')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    
    renderResume: async(req, res) =>{
      console.log(req.params.id)
      obj = await Review.findOne({_id: req.params.id})
      console.log(obj)
      res.render('resume.ejs',{obj: obj})
    },

    addLike: async (req, res)=>{
      console.log(req.body.id)
        try{
            review = await Review.findOne({_id : req.body.id})
            
            if(review.likes)
              review.likes++
            else
              review.likes = 1

            await review.save()
            console.log('Likes++')
            res.json('Likes++')
        }catch(err){
            console.log(err)
        }
    },


}    
