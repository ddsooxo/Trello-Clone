//models
var Board = require('../models/board');
var List = require('../models/list');


//get | show a list of boards
exports.showBoards = function (req, res){
    var board = new Board({_id: req.params.board_id});
    Board.find({}, function (error, boards){
        if(boards){
            res.json(boards);
        }else if(error){
            console.log("errorrrrrr" + error.stack);
        }
    });
}

//post | submit created list
exports.submitBoard = function (req, res){
    var board = new Board({
        title: req.body.title
    });
    // console.log('req.body.title: ' + req.body.title);
    board.save(function (error, board){
        if(board){
           Board.find({}, function (error, boards){ 
                if(boards){
                    res.json(boards);
                }
                else if(error){
                    console.error('Failed to save' + error.stack);
                }
            });
        }
    });
}

//POST | deletes board by board id
exports.deleteBoard = function (req, res){
    var board = new Board({_id: req.params.board_id});
    board.remove(function (error, board){
        if(board){
            Board.find({}, function (error, boards){
                if(boards){
                    res.json(boards);
                }
                else if(error) throw error;
                // console.error('board is not deleted' + error.stack);
            }) ;
        }
        else if(error){
            console.error('Failed to save' + error.stack);
        }
    })
}

//POST | updates board by board id
exports.editBoard = function (req, res){
    var board = {_id: req.params.board_id};
    console.log('req.query: ' + req.query.title);
    Board.update(board, {title: req.query.title}, function (error, board){
        if(board){
            Board.find({}, function (error, board){
                res.json(board);
                console.log(board);
            })
        } else if(error){
            console.log(error.stack);
            res.redirect('/error');
        }
    })
}


