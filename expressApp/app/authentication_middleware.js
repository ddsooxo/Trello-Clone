var jwt = require ('jsonwebtoken');
var app = require('../app');

exports.isAuthenticated = function(req, res, next) {

  var token = req.headers['x-access-token'];
  
  if(req.originalUrl == '/api/login' || '/api/user/register'){
    next();
    return;
  }else if (token) {

    //decode token
    // verifies secret and checks exp
    jwt.verify(token, app.app.get('superSecret'), function (err, decoded) {      
      if (err) {
        return res.status(422).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
};