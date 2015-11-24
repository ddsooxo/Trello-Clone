var bcrypt = require('bcrypt-nodejs'),
    app = require('../../app'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs');

//Models
var User = require('../models/user'),
    Board = require('../models/board');


exports.authenticate = function (req, res){
    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(200).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.app.get('superSecret'), {
          expires: 1440*60 // expires in 24 hours
        });
        
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
}





