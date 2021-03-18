// Use Node's Express framework
const express = require('express');
// Instantiates variables to use multiple express routes
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');
// Instantiate Bootcamp to extend ../models/Bootcamp file
const Bootcamp = require('../models/Bootcamp');

// Instantiates courseRouter and reviewRouter to extend files 
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();
//Instantiate advancedResults to export ../middleware/advancedResults
const advancedResults = require('../middleware/advancedResults');
// Instantiate protect, authorize to export ../middlware/auth
const { protect, authorize } = require('../middleware/auth');

// Router uses and refences routes courses and reviews
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);
// User request uses input zipcode which returns bootcampes within a certain distance
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router // request to edit photos by admin with authorization
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router // 
  .route('/') // r 
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps) // user request to return bootcamp courses
  .post(protect, authorize('publisher', 'admin'), createBootcamp); // admin request to create a bootcamp

router
  .route('/:id') // requesting /:id route
  .get(getBootcamp) // user requests a bootcamp
  .put(protect, authorize('publisher', 'admin'), updateBootcamp) //admin requests authorization to update bootcamp
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);// admin request to delete a bootcamp

// Exports this file
module.exports = router;
