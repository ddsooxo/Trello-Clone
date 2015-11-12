//models
var List = require('../models/list');
var Item = require('../models/item');
var Board = require('../models/item');
var bodyParser  = require('body-parser');


//get
//show a list of lists
exports.showLists = function (req, res){
    var list = new List({_id: req.params.list_id});
    List.find({}, function (error, lists){
        if(lists){
            res.json(lists);
        }else if(error){
            console.log("errorrrrrr" + error.stack);
        }
    });
    // List.find({_board: req.params.board_id}, function (error, lists){
    //     if(lists){
    //         res.json(lists);
    //     }else if (error){
    //         console.log(error.stack);
    //         res.json({status: 400, message: error.message});
    //     }
    // });
}


//post
//submit created list
exports.submitList = function (req, res){
    var list = new List({list_title: req.body.list_title});
    list.save(function (error, list){
        if(list){
           List.find({}, function (error, lists){ 
                if(lists){
                    res.json(lists);
                }
                else if(error){
                    console.error('Failed to save' + error.stack);
                }
            });
        }
    });
}

//POST
//deletes list by list id
exports.deleteList = function (req, res){
    var list = new List({_id: req.params.list_id});
    list.remove(function (error, list){
        if(list){
            List.find({}, function (error, lists){
                if(lists){
                    res.json(lists);
                }
                else if(error) throw error;
                // console.error('list is not deleted' + error.stack);
            }) ;
        }
        else if(error){
            console.error('Failed to save' + error.stack);
        }
    })
}

//POST
//updates list by list id
exports.editList = function (req, res){
    var list = {_id: req.params.list_id};
    console.log('req.query: ' + req.query.list_title);
    List.update(list, {list_title: req.query.list_title}, function (error, list){
        if(list){
            List.find({}, function (error, list){
                res.json(list);
                console.log(list);
            })
        } else if(error){
            console.log(error.stack);
            res.redirect('/error');
        }
    })
}


