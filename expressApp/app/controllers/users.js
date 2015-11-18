var User = require('../models/user');

//encryption
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

//post | logs in a usesr
exports.login = function (req, res){
    var hash = bcrypt.hashSync(req.body.password);
    User.findOne({ 
        email: req.body.email,
        password: hash
    }, function (error, user){
        // console.log('error', error);
        // console.log('user', user);
        if(error || !user){
            res.status(422).json({message: 'Invalid login'});
        }else{
            res.json(user);
        }
    });
}


//post | creates a new user
exports.register = function (req, res){
    var hash = bcrypt.hashSync(req.body.password);
    var user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        bio: req.body.bio
    });
    user.save(function (error, user){
        if(user){
            res.status(201).json(user);
        }else if(error){
            console.error('Failed to create new user' + error.stack);
            res.status(422).json({message: error.message});
        }
    })
}




