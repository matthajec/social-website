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

router.post('/login', authController.postLogin);

// SIGN UP
// ===============================================================================

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

// LOGOUT
// ===============================================================================

router.post('/logout', authController.postLogout);

// export the router
module.exports = router;