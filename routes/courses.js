// Use Node's Express framework
const express = require('express');
// Instantiatew variables to use ../controllers/courses
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

// Instantiate Bootcamp to extend file ../models/Course
const Course = require('../models/Course');
// 
const router = express.Router({ mergeParams: true });
//instantiate advancedResults to require file ../middleware/anvan and ../models/BootcampceReaults
const advancedResults = require('../middleware/advan ../models/BootcampcedResults');
//Instantiates protect and authorize to requre file ../middleware/auth which authorizes a user
const { protect, authorize } = require('../middleware/auth');

router
  .route('/') // using root route
  .get( // user request for bootcamp courses
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  // admin request to add a course
  .post(protect, authorize('publisher', 'admin'), addCourse);

router
  .route('/:id') // using route /:id
  .get(getCourse) // user requests course
  .put(protect, authorize('publisher', 'admin'), updateCourse) //admin request to update a course
  .delete(protect, authorize('publisher', 'admin'), deleteCourse); //adminst request to delete a course

// Export this file for other files to use
module.exports = router;
