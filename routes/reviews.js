// Use Node's Express framework
const express = require('express');
//Instantiate variables to use ../controllers/reviews
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');
// Instantiate Review to use ../models/Review
const Review = require('../models/Review');
// Instantiate router to use express with mergeParams that are true
const router = express.Router({ mergeParams: true });

//Instanctiate advanceResulte to use middleware advancedResults
const advancedResults = require('../middleware/advancedResults');
//Instantiate protect and authorize to use middleware auth
const { protect, authorize } = require('../middleware/auth');

router
  .route('/') // use root route
  .get( // request reviews of selected bootcamps
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
  // admin can add review 
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id') // use /:id route
  .get(getReview) // user get bootcamp review
  .put(protect, authorize('user', 'admin'), updateReview) // admin can update bootcamp review
  .delete(protect, authorize('user', 'admin'), deleteReview); // admin can delete boocamp review

   // Export this file for other files to use
module.exports = router;
