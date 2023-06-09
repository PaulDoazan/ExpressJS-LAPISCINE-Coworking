const express = require('express');
const router = express.Router();
const coworkingController = require('../controllers/coworkingController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, coworkingController.createCoworking)

router
    .route('/withReview')
    .get(coworkingController.findAllCoworkingsByReviewSQL)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(authController.protect, coworkingController.updateCoworking)
    .delete(authController.protect, authController.restrictTo('user', 'admin'), coworkingController.deleteCoworking)

module.exports = router; 