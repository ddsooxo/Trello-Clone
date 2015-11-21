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
    var testBoard;

    beforeEach(function (done) {
      Board.create({title: 'Test Board Title'}, function (err, newBoard){
        if(err){
          console.log(err);
        }else{
          testBoard = newBoard;
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
      testBoard.remove(function (err, removedBoard){
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

    // //create a new list
    //   it('should create a new list', function (done) {
    //     request(app)
    //     .post('/api/list/create')
    //     .send({list_title: 'new list title from createList', _board: testBoard._id})
    //     .expect(200)
    //     .expect('Content-Type', /json/)
    //     .end(function (err, res){
    //         if (err) {
    //           done.fail(err);
    //         } else {
    //           console.log('res.body: ', res.body);
    //           returnedList = res.body;
    //           expect(returnedList.list_title).toBe('new list title from createList');
    //           List.findOne({ list_title:'new list title from createList'}, function (err, newList){
    //             if(err){
    //             }else{
    //               newList.remove(function (err){
    //                 if(err){
    //                   console.log(err);
    //                 }else{
    //                   return done();
    //                 }
    //               })
    //             }
    //           })
    //         }
    //     });
    //   });




  });
});

