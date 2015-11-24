var request = require('supertest');
var List = require('../../app/models/list');
var Board = require('../../app/models/board');
var ListsController = require('../../app/controllers/lists');
var app = require('../../app').app;
  
describe('ListsController', function() {
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

  describe('with data', function() {
    var list;
    var testBoard;

    beforeEach(function (done) {
      Board.create({title: 'Test Board Title'}, function (err, newBoard){
        if(err){
          console.log(err);
        }else{
          testBoard = newBoard;
          List.create({list_title: 'Test List Title1', _board: testBoard._id}, function (err, newList){
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

    //create a new list in a board
    it('should create a new list in a board', function (done) {  
      request(app).post('/api/list/create')
      .send({
        list_title: 'New List in Board',
        _board: testBoard._id
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_title: 'New List in Board'}, function (err, newList){
            if(err){
              console.log(err)
            }else{
              newList.remove(function (err){
                if(err){
                  console.log(err);
                }else{
                  return done();
                }
              })
            }
            })
        }
      })
    });
    
    // delete an list of a list
    it('should delete an list of a list', function (done) {
      request(app).post('/api/list/delete/' + list._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_title: 'Test Board Title'}, function (err, deletedList){
            if(err){
              console.log(err);
            }else {
              return done();
            }
          })
        }
      })
    });

      //update an list of a board
    it('should udate an list of a list', function (done) {
      request(app).post('/api/list/edit/' + list._id + '?list_title=' + list.list_title)
      .send({list_title: 'Updated test list title', _list: list._id})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_title: 'Updated test list title', _board: testBoard._id}, function (err, updatedList){
            if(err){
              console.log(err);
            }else{
              return done();
            }
          })
        }
      })
    });


  });
});

