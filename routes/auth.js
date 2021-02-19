// SET UP
// ===============================================================================

const express = require('express');

// create an express router
const router = express.Router();

// import the auth controller
const authController = require('../controllers/auth');;

// LOG IN
// ===============================================================================

router.get('/login', authController.getLogin);

// SIGN UP
// ===============================================================================

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

// export the router
module.exports = router;