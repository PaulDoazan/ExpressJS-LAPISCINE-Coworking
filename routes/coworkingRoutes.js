const express = require('express');
const router = express.Router();
const coworkingController = require('../controllers/coworkingController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, coworkingController.createCoworking)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(authController.protect, coworkingController.updateCoworking)
    .delete(authController.protect, coworkingController.deleteCoworking)

module.exports = router; 