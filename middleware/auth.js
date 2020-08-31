const jwt = require('jsonwebtoken');
const config = require('config');

//Middleware to protect our route with jwt, verify jwt that comes in from client to authorize the user.

module.exports = function(req, res, next){

    //Get the token from the header - we are gonna send this token with this header.
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user; //user is in the pay load of decoded value
        next();
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
}