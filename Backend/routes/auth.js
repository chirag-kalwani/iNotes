const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const JWT_SECRET = "Chiragisagoodboy";
// create user using post request with end point "/api/auth"
router.post('/', [
        body('email').isEmail(),
        body('password').isLength({min: 5}),
        body('name').isLength({min: 3})
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
        const authToken = jwt.sign({id: user.id}, JWT_SECRET);
        // check if there is some error ocur or not
        if (!resObj) {
            return res.status(500).json({error: "Some error ocurr"});
        }
        res.status(200).json({authToken: authToken});
    }
);

module.exports = router;