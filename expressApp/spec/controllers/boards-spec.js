var request = require('supertest');
var Board = require('../../app/models/board');
var User = require('../../app/models/user');
var BoardsController = require('../../app/controllers/boards');
var app = require('../../app').app;

describe('BoardsController', function() {

  describe('without data', function(){
    
    //return a list of boards
    it('should return a list of boards', function (done) {
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
    var testUser;

    beforeEach(function (done) {
      User.create({
        full_name: 'Test User',
        username: 'testUsername',
        email: 'testuser@email.com',
        password: 'password' 
      }, function (err, newUser){
        if (err) {
          console.log(err);
        } else {
          testUser = newUser;
          Board.create({title: 'board Test Title1', _user: testUser.id}, function (err, newBoard) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              board = newBoard;
              done();
           }
          });
        }
      })
    });

    afterEach(function (done) {
      testUser.remove(function (err, removedUser){
        if(err){
          console.log(err);
          // done.fail(err);
        } else{
          board.remove(function (err, removedBoard) {
            if (err) {
              done.fail(err);
            } else {
              done();
            }
          });
        }
      });
    });


    //create new board
    it('should create a new board', function (done){
      request(app).post('/api/board/create')
      .send({title: 'Board Test Title2', _user: testUser.id})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
          if(err){
            done.fail(err);
          }else {
            Board.findOne({title: 'Board Test Title2'}, function (err, newBoard){
              if(err){
                console.log(err)
              }else{
                newBoard.remove(function (err){
                  if(err){
                    done.fail(err);
                    console.log(err);
                  }else{
                    return done();
                  }
                })
              }
            })
          }
        });
    })

    // delete a board
    it('should delete an existing board', function (done) {
      request(app).post('/api/board/delete/' + board._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          Board.findOne({title: 'Board Test Title'}, function (err, deletedBoard){
            if(err){
              console.log(err);
            }else {
              return done();
            }
          })
        }
      })
    });

    //update an a board
    it('should update a board', function (done) {
      request(app).post('/api/board/edit/' + board._id + '?board_title=' + board.title)
      .send({title: 'Updated test board title'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          Board.findOne({title:'Updated test board title'}, function (err, updatedBoard){
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


