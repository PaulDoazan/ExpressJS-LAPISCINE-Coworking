const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController') 

router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/login')
    .post(authController.login)

// router
//     .route('/:id')
//     .get(coworkingController.findCoworkingByPk)

module.exports = router;