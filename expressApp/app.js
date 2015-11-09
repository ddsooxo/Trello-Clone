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
var ListsController = require('./app/controllers/lists');
var ItemsController = require('./app/controllers/items');

//Dependencies 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));


//-------------------LIST ROUTES-------------------------------
// //show lists
app.get('/api/lists', ListsController.showLists);
//show one list with items 
// app.get('/api/list/view', ListsController.showOneList);
//create lists
app.post('/api/list/create', ListsController.submitList);
//delete lists
app.post('/api/list/delete/:list_id', ListsController.deleteList);
//update item
app.post('/api/list/edit/:list_id', ListsController.editList);


//-------------------ITEM ROUTES-------------------------------
//show items
app.get('/api/items', ItemsController.showItems);
//create items
app.post('/api/item/create', ItemsController.submitItem);
//delete items
app.post('/api/item/delete/:item_id', ItemsController.deleteItem);
//update item
app.post('/api/edit/:item_id', ItemsController.editItem);



//port
app.listen(3000);
console.log('listening on port 3000');

