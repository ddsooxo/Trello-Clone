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
        console.log('err', err);
        console.log('res.body', res.body);
        if(err){
          done.fail(err);
        } else{
          done();
        }
      })
    });
    
    // //create new user
    // it('should register a new user', function (done) {
    //   request(app).post('/api/user/register')
    //   .send({
    //     full_name: 'Test Full Name',
    //     email:'test@email.com',
    //     password: 'test password',
    //     bio: 'test bio'
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(newUser)
    //       .destroy();
    //       done();
    //     }
    //   })
    // });


  // describe('tests with data', function() {
  //   var user;
    
  //   var newUser = function (res){
  //     res.body.should.have.property(
  //       'full_name', 'Test Full Name',
  //       'email', 'test@email.com',
  //       'password', 'test password',
  //       'bio', 'test bio'
  //     )
  //   };

  //   beforeEach(function (done) {
  //     User.create({
  //       full_name: 'Full Name beforeEach',
  //       email: 'before@each.com',
  //       password: 'test password',
  //       bio: 'test bio'
  //     }, function (err, newUser){
  //       if(err){
  //         console.log(err);
  //       } else {
  //         user = newUser;
  //       }
  //     })
  //   });

  //   afterEach(function(done) {
  //     user.remove(function (err, removedUser){
  //       if(err){
  //         console.log(err);
  //         done.fail(err);
  //       } else{
  //         done();
  //       };
  //     });
  //   });

  //   it('should login a user', function (done) {
  //     request(app).post('/api')
  //     .send({
  //       email:'before@each.com',
  //       password: 'test password'
  //     })
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end(function (err, res){
  //       if(err){
  //         done.fail(err);
  //       } else{
  //         done();
  //       }
  //     })
  //   });

  });
});









