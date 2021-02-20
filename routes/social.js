// SET UP
// ===============================================================================

const express = require('express');

// create an express router
const router = express.Router();

// import the auth controller
const socialController = require('../controllers/social');;

const { auth } = require('../util');

// HOME
// ===============================================================================

router.get('/', auth.checkAuth({ level: 10 }), socialController.getHome);

// export the router
module.exports = router;