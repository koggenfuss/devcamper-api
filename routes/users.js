// Use Node's Express framework
const express = require('express');
// Instantiates multiple variables to use ../controllers/users file
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');
// Instantiate User to use ../models/User
const User = require('../models/User');


const router = express.Router({ mergeParams: true });

// Instantiate advancedResults to use middleware advancedResults
const advancedResults = require('../middleware/advancedResults');
// Instantiate protect and authorize to use middleware auth
const { protect, authorize } = require('../middleware/auth');

// Use middleware auth to authorize the admin
router.use(protect);
router.use(authorize('admin'));

router
  .route('/') // Use root route
  .get(advancedResults(User), getUsers)// User request for advanced results
  .post(createUser); //create new user

router
  .route('/:id') // Use route /:id
  .get(getUser) // Request to get user
  .put(updateUser) // request to update user
  .delete(deleteUser); // request to delete user

  // Export this file for other files to use
module.exports = router;
