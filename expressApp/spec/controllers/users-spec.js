var request = require('supertest');
var User = require('../../app/models/user');
var UsersController = require('../../app/controllers/users');
var app = require('../../app').app;
var auth = {};
var authUser;

// TODO: Ask Kirk, why pass auth?
beforeAll(loginUser(auth));

describe('UsersController', function() {
  
  describe('tests with data', function() {
      var testUser;

      //testUser to be created/destroyed
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
            done.fail(err);
          } else {
            testUser = newUser;
            done();
          }
        })
      });

      afterEach(function (done) {
        testUser.remove(function (err){
          if(err){
            console.log(err);
            done.fail(err);
          } else{
            done();
          };
        });
      });

      //register a new user
      it('should create a new user', function (done) {
        request(app)
        .post('/api/user/register')
        .send({
            full_name: 'New User',
            email: 'new@email.com',
            username: 'newuser',
            password: 'newusercreate',
            bio: 'hello'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res){
            if (err) {
              console.log('im in error land');
              done.fail(err);
            } else {
              returnedUser = res.body;
              expect(returnedUser.email).toBe('new@email.com');
              User.findOne({ email:'new@email.com'}, function (err, newUser){
                if(err){
                  // done.fail(err);
                  //might fail the test, add done.fail(err);
                }else{
                  newUser.remove(function (err){
                    if(err){
                      // done.fail(err);
                      //add done.fail(err);
                      console.log(err);
                    }else{
                      return done();
                    }
                  })
                }
              })
            }
        });
      });

      //delete user
      it('should delete a user', function (done){
        request(app)
        .post('/api/user/delete/' + testUser._id)
        .set('x-access-token', auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end( function (err, res){
          if(err){
            done.fail(err);
          }else{
            User.findOne({email: 'before@each.com'}, function (err, deletedUser){
              if(err){
                console.log(err);
              } else{
                return done();
              }
            })
          }
        })
      });


    //update user
    it('should update a user', function (done){
      request(app)
      .post('/api/user/edit/' + testUser._id)
      .set('x-access-token', auth.token)
      .send({
        full_name: 'test 4',
        username: 'test4',
        email: 'test4@test.com',
        password: 'password4',
        bio: 'hello4'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end( function (err, res){
        if(err){
          done.fail(err);
        }else{
          User.findOne({email: 'test4@test.com'}, function (err, updatedUser){
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

function loginUser(auth){
  return function (done){
    request(app)
      .post('/api/login')
      .send({
          email: 'tea@pot.com',
          password: 'ilikehottea'
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}

// TODO: Ask Kirk how to do this more elegantly
//auth user
// beforeAll(function (done){
//   request(app)
//     .post('/api/user/register')
//     .send({
//       full_name: 'Auth Full Name',
//       username: 'authuser',
//       email:'auth@email.com',
//       password: 'authpassword',
//       bio: 'bio'
//     })
//     .end(function (err, res){
//       if(err){
//         console.log(err);
//         return done.fail(err);
//       }else{
//         authUser = res.body;
//         console.log('res.body:', res.body.email);
//         return loginUser();
//         // return done();
//       }
//     });
// });

// afterAll(function (done) {
//   console.log('im here at line 35');
//   request(app)
//     .post('/api/user/delete/' + authUser._id)
//     .end(function (err, res){
//       if(err){
//         console.log(err);
//         return done.fail(err);
//       }else{
//         console.log('succesfull delete');
//         return done();
//     }
//   })
// });


