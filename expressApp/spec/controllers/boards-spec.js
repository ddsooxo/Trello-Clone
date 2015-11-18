var request = require('supertest');
var Board = require('../../app/models/board');
var List = require('../../app/models/list');
var BoardsController = require('../../app/controllers/boards');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('BoardsController', function() {



  describe('without data', function(){

    //return board
    it('should return list of boards', function (done) {
      request(app).get('/api/boards')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toBeDefined();
          done();
        }
      });
    });

  })

  describe('with data', function() {
    var board;

    beforeEach(function(done) {
      Board.create({title: 'test board title'}, function (err, newBoard){
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
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
    
  });
});

