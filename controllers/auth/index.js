/**
 * Authentication routes
 */

'use strict';

const router = require('express').Router();
const authController = require('./authController');


router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

module.exports = router;
