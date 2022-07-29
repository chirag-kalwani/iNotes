const express = require('express');
const router = express.Router();
const User = require('../models/User');

// create user using post request with end point "/api/auth"
router.post('/', (req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
    console.log(user.name);
    console.log(user.email);
    console.log(user.password);
    user.save().then(r => console.log(r)).catch(e => console.log(e));
    res.send("Hello auth");
});

module.exports = router;