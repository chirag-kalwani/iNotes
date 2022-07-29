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
    (req, res) => {

        // Check if there is error or not
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const user = new User(req.body);// creating object User can print User.name .emai .password
        user.save().then(() => res.send("Hello auth")).catch(e => res.status(400).send(e));
    }
);

module.exports = router;