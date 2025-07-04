const captainController = require('../Controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.type').isIn(['car', 'bike', 'truck', 'van']).withMessage('Invalid vehicle type'),
], 
    captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min : 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;