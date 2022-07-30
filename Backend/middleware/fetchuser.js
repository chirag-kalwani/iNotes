const jwt = require('jsonwebtoken');
const JWT_SECRET = "Chiragisagoodboy";
const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req
    const token = req.header('auth-token'); // this is authToken
    if (!token) {
        return res.status(401).send({error: "Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (e) {
        return res.status(401).send({error: "Please authenticate using valid token " + e});
    }
};


module.exports = fetchuser;