const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Chiragisagoodboy";
// Route1: No login required ==  create user using post request with end point "/api/auth/createuser"
router.post('/createuser', [
        body('email', "Enter a valid email").isEmail(),
        body('password', "password length should be of minimum length 5").isLength({min: 5}),
        body('name', "name length shoul be of length 3").isLength({min: 3})
    ],
    async (req, res) => {
        // Check if User enter there details correct or not by node module ==>  express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // check if email is already present or not ==> user is awailable after await returns
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: "A user with these email is already present"});
        }
        // Create salt and encrypt the password of the user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // if user is not awailable then create user
        user = new User({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        }); // creating object User can print User.name .email .password
        // store created user in database
        let resObj = await user.save();
        // create authToken to verify the user
        const payLoad = {
            user: {
                id: resObj._id
            }
        }
        const authToken = jwt.sign(payLoad, JWT_SECRET);
        // check if there is some error ocur or not
        if (!resObj) {
            return res.status(500).json({error: "Some error ocurr"});
        }
        res.status(200).json({authToken: authToken});
    }
);

// Route2: No login required ==  login user using post request with end point "/api/auth/createuser"
router.post('/login', [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password should not be blank").exists()
    ],
    async (req, res) => {
        // Check if User enter there details correct or not by node module ==>  express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try {
            let resObj = await User.findOne({email: email});
            if (!resObj) {
                return res.status(400).json({error: "Please try to login with correct credenial"});
            }
            const passwordCompare = await bcrypt.compare(password, resObj.password);
            if (!passwordCompare) {
                return res.status(400).json({error: "Please try to login with correct credenial"});
            }
            const payLoad = {
                user: {
                    id: resObj._id
                }
            }
            const authToken = jwt.sign(payLoad, JWT_SECRET);
            res.status(200).json({authToken: authToken});
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal server error");
        }
    });

// Route 3 : logged in ==> get logged in user details // res.header == auth-token
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findOne({id: userId}).select('-password');
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;