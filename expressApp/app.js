var express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    bcrypt = require('bcrypt-nodejs');

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytodoapp');

//Models 
var Item = require('./app/models/item');

//Controllers
var BoardsController = require('./app/controllers/boards');
var ListsController = require('./app/controllers/lists');
var ItemsController = require('./app/controllers/items');

//Dependencies 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));


//------------------BOARD ROUTES-------------------------------
// //show board
app.get('/api/boards', BoardsController.showBoards);
//create board
app.post('/api/board/create', BoardsController.submitBoard);
//delete board
app.post('/api/board/delete/:board_id', BoardsController.deleteBoard);
//update board
app.post('/api/board/edit/:board_id', BoardsController.editBoard);


//-------------------LIST ROUTES-------------------------------
// //show lists
app.get('/api/lists', ListsController.showLists);
//create lists
app.post('/api/list/create', ListsController.submitList);
//delete lists
app.post('/api/list/delete/:list_id', ListsController.deleteList);
//update list
app.post('/api/list/edit/:list_id', ListsController.editList);


//-------------------ITEM ROUTES-------------------------------
//show items
app.get('/api/items/:list_id', ItemsController.showItems);
//create items
app.post('/api/item/create', ItemsController.submitItem);
//delete items
app.post('/api/item/delete/:item_id', ItemsController.deleteItem);
//update item
app.post('/api/item/edit/:item_id', ItemsController.editItem);



//port
app.listen(3000);
console.log('listening on port 3000');
exports.app = app;

