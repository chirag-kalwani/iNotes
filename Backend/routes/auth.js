const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
// create user using post request with end point "/api/auth"
router.post('/', [
        body('email').isEmail(),
        body('password').isLength({min: 5}),
        body('name').isLength({min: 3})
    ],
    async (req, res) => {
        // Check if there is error or not
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: "A user with these email is already present"});
        }
        user = new User(req.body); // creating object User can print User.name .emai .password
        let resObj = await user.save();
        if (!resObj) {
            return res.status(400).json({error: "Some error ocurr"});
        }
        res.status(200).json(resObj);
    }
);

module.exports = router;