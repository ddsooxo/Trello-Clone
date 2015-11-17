var User = require('../models/user');

//encryption
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

//post
exports.submitLogin = function (req, res){
    var hash = bcrypt.hashSync(req.body.password);
    User.findOne({ 
        email: req.body.email,
        password: hash
    }, function (error, user){
        console.log('get there please');
        console.log('error', error);
        console.log('user', user);
        if(error || !user){
            res.status(422).json({message: 'Invalid login'});
        }else{
            res.json(user);
        }
    });
}