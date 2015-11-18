var request = require('supertest');
var User = require('../../app/models/user');
var UsersController = require('../../app/controllers/users');

var app = require('../../app').app;


describe('UsersController', function() {

  describe('without data', function(){

   it('should login a user', function (done) {
      request(app).post('/api/login')
      .send({
        email:'test2@email.com',
        password: 'test2 password'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        } else{
          done();
        }
      })
    });
    
    //create new user
    it('should create a new user', function (done) {
      request(app).post('/api/user/register')
      .send({
        full_name: 'Test3 Full Name',
        username: 'test3username',
        email:'test4@email.com',
        password: 'test3 password',
        bio: 'test3 bio'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.username).toEqual('test3username');
          User.remove({username: 'test3username'}, function (err, deletedUser){
            if(err){
              done.fail.err('Failed to remove user.');
            } else{
              done();
            }
          });
        }
      })
    });


  describe('tests with data', function() {
    var user;

    beforeEach(function (done) {
      User.create({
        full_name: 'Full Name beforeEach',
        username: 'testusername',
        email: 'before@each.com',
        password: 'test password',
        bio: 'test bio'
      }, function (err, newUser){
        if(err){
          console.log(err);
        } else {
          user = newUser;
          done();
        }
      })
    });

    afterEach(function(done) {
      user.remove(function (err, removedUser){
        if(err){
          console.log(err);
          done.fail(err);
        } else{
          done();
        };
      });
    });


    //create new user
    it('should register a new user', function (done) {
      request(app).post('/api/user/register')
      .send({
        full_name: 'test full name',
        username: 'username',
        email:'test@test.com',
        password: 'test3password',
        bio: 'test test bio'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.email).toEqual('test@test.com');
          User.remove({email: 'test@test.com'}, function (err, deletedUser){
            if(err){
              done.fail.err('Failed to remove user with data.');
            } else{
              done();
            }
          });
        }
      })
    });

    // it('should login a user', function (done) {
    //   request(app).post('/api')
    //   .send({
    //     email:'before@each.com',
    //     password: 'test password'
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     } else{
    //       done();
    //     }
    //   })
    // });

    });
  });
});










