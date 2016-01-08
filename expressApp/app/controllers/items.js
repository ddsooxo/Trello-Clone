//models
var Item = require('../models/item');

//get | show item
exports.showItems = function (req, res){
    Item.find({
        _list: req.query.list_id
    }, function (error, items){
        if(items){
            res.json(items);
        }else if (error){
            console.log(error.stack);
            res.json({status: 400, message: error.message});
        }
    });
}

//post | submit created item
exports.submitItem = function (req, res){
    var item = new Item({
        item_title: req.body.item_title,
        _list: req.body.list_id
    });
    item.save(function (error, item){
        if(item){
            res.json(item);
        }
        else if(error){
            console.error('Failed to save' + error.stack);
            res.json({status: 400, message: error.message});
        }
    });
}


//POST | deletes item by item id
exports.deleteItem = function (req, res){
    var item = new Item({_id: req.params.item_id});
    item.remove(function (error, item){
        if(item){
            res.json(item);
        }
        else if(error){
            console.error(error.stack);
            res.json({status: 400, message: error.message});
        }
    })
}

//POST | updates item by item id
exports.editItem = function (req, res){
    var itemId = {_id: req.params.item_id};
    Item.update(itemId, {item_title: req.query.item_title}, function (error, item){
        if(item){
            res.json(item);
        } else if(error){
            console.log(error.stack);
            res.redirect('/error');
            res.json({status: 400, message: error.message});
        }
    })
}
