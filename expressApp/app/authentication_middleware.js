var jwt = require ('jsonwebtoken');

exports.authenticate2 = function(req, res, next, app) {
  
  if(req.originalUrl == '/api/login'){
    next();
    return;
  }else if (token = req.headers['x-access-token']) {
    //decode token
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {      
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