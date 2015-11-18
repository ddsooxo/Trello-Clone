var request = require('supertest');
var List = require('../../app/models/list');
var Board = require('../../app/models/board');
var ListsController = require('../../app/controllers/lists');

var app = require('../../app').app;
  
  describe('without data', function(){

    //return lists
    it('should return list of lists', function (done) {
      request(app).get('/api/lists')
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

describe('ListsController', function() {
  describe('with data', function() {
    var list;
    var board;

    beforeEach(function (done) {
      Board.create({title: 'Test Board Title'}, function (err, newBoard){
        if(err){
          console.log(err);
        }else{
          board = newBoard;
          List.create({list_title: 'Test List Title1'}, function (err, newList){
            console.log('List.list_title: ',List.list_title);
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              list = newList;
              done();
            }
          });
        }
      })
    });

    afterEach(function(done) {
      board.remove(function (err, removedBoard){
        if(err){
          console.log(err);
        }else{
          list.remove(function (err, removedList){
            if(err){
              console.log(err);
              done.fail(err);
            } else{
              done();
            }
          });
        }
      });
    });


    //return a new list
    // it('should create a new list in a board', function (done) {  
    //   request(app).post('/api/list/create')
    //   .send({
    //     list_title: 'Test List Title1',
    //     _board: board._id
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body.list_title).toBe(list.list_title);
    //       List.remove({item_title: 'List Test Title1'}, function (err, deletedList){
    //         if(err){
    //           done.fail.err('Failed to remove list with data');
    //         }else{
    //           done();
    //         }
    //       })
    //     }
    //   })
    // });

    // //return a list
    // it('should return a single list', function (done) {
    //   request(app).get('/api/lists')
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function(err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body.length).toEqual(1);
    //       returnedList = res.body[0];
    //       expect(returnedList.list_title).toEqual(list.list_title);
    //       done();
    //     }
    //   })
    // });



  });
});

