var request = require('supertest');
var Board = require('../../app/models/board');
var List = require('../../app/models/list');
var BoardsController = require('../../app/controllers/boards');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('BoardsController', function() {
  describe('with data', function() {
    var board;

    beforeEach(function(done) {
      Board.create({title: 'test board title'}, function (err, newBoard){
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          console.log('newBoard: ', newBoard);
          board = newBoard;
          done();
        }
      })
    });

    afterEach(function(done) {
      board.remove(function (err, removedBoard){
        if(err){
          console.log(err);
          // done.fail(err);
        } else{
          done();
        }
      });
    });

    //return list of boards
    it('should return one list of board', function (done) {
      request(app).get('/api/boards')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.length).toEqual(1);
          returnedBoard = res.body[0];
          expect(returnedBoard.title).toEqual(board.title);
          done();
        }
      })
    });
  });
});

