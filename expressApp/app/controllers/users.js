var User = require('../models/user');

//encryption
var AuthenticationMiddleware = require('../authentication_middleware'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs');

//post | creates a new user
exports.register = function (req, res){
    var hash = bcrypt.hashSync(req.body.password);
    // var salt = bcrypt.genSaltSync(10);

    var user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        bio: req.body.bio
    });
    user.save(function (error, newUser){
        if (newUser){
            res.status(200).json(newUser);
        }else if(error){
            console.error('Error: Failed to create new user' + error.stack);
            res.status(422).json({message: error.message});
        }
    })
}

//post | delete user by user id
exports.deleteUser = function(req, res){
    var user = new User({_id: req.params.user_id});
    user.remove(function (error, user){
        if(user){
            User.find({}, function (error, otherUsers){
                if(otherUsers){
                    res.status(200).json(otherUsers);
                }else{
                    console.error('Failed to delete a user' + error.stack);
                    res.status(422).json({message: error.message});
                }
            })
        }else if(error){
            console.error('Failed to delete a user' + error.stack);
            res.status(422).json({message: error.message});
        }
    })
}

//post | update user by user id
exports.editUser = function(req, res){
    var hash = bcrypt.hashSync(req.body.password);
    var userId = new User({_id: req.params.user_id});
    User.update(userId,{
        full_name: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        bio: req.body.bio
    }, 

    function (error, user){
        if(user){
            res.status(200).json(user);
        }else if(error){
            console.error('Failed to update a user' + error.stack);
            res.status(422).json({message: error.message});
        }  
    });
}











