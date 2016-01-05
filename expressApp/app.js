var express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytodoapp');

//Secret variable
app.set('superSecret', 'thisismysuperdupertopsecret');

//Models
var User = require('./app/models/user');

//Controllers
var UsersController = require('./app/controllers/users');
var BoardsController = require('./app/controllers/boards');
var ListsController = require('./app/controllers/lists');
var ItemsController = require('./app/controllers/items');

var AuthenticationController = require('./app/controllers/authentication');
var AuthenticationMiddleware = require('./app/authentication_middleware');


//Dependencies | bodyParser, Authenticate(Run the authenticate method for all routes that starts with '/api')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));

app.use('/api', AuthenticationMiddleware.isAuthenticated);


//------------------USER ROUTES-------------------------------//
// app.get('/api/users', UsersController.showUsers);
//authenticate when user logs in
app.post('/api/login', AuthenticationController.authenticate)
//create a new user account 
app.post('/api/user/register', UsersController.register);
//delete user
app.post('/api/user/delete/:user_id', UsersController.deleteUser);
// //update user
app.post('/api/user/edit/:user_id', UsersController.editUser);

//------------------BOARD ROUTES-------------------------------//
//show board
app.get('/api/boards', BoardsController.showBoards);
//create board
app.post('/api/board/create', BoardsController.submitBoard);
//delete board
app.post('/api/board/delete/:board_id', BoardsController.deleteBoard);
//update board
app.post('/api/board/edit/:board_id', BoardsController.editBoard);


//-------------------LIST ROUTES-------------------------------//
//show lists
app.get('/api/lists', ListsController.showLists);
//create list
app.post('/api/list/create', ListsController.submitList);
//delete list
app.post('/api/list/delete/:list_id', ListsController.deleteList);
//update list
app.post('/api/list/edit/:list_id', ListsController.editList);


//-------------------ITEM ROUTES-------------------------------//
//show items
app.get('/api/items', ItemsController.showItems);
//create item
app.post('/api/item/create', ItemsController.submitItem);
//delete item
app.post('/api/item/delete/:item_id', ItemsController.deleteItem);
//update item
app.post('/api/item/edit/:item_id', ItemsController.editItem);



//port
app.listen(3000);
console.log('listening on port 3000');
exports.app = app;

