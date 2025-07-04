const captainService = require('../Services/captain.services');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../Models/blacklistToken.model');
const captainModel = require('../Models/captain.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAllreadyExists = await captainModel.findOne({ email });
    if (isCaptainAllreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.type
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});

}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (!captain) {
        return res.status(400).json({ message: 'Captain with this email does not exists' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' }); 
}