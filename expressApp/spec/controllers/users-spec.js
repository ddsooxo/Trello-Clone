var request = require('supertest');
var bcrypt = require('bcrypt-nodejs');
var User = require('../../app/models/user');
var UsersController = require('../../app/controllers/users');
var app = require('../../app').app;
var auth = {};
var user;
var authUser;

/*beforeAll & afterAll runs before anytning else. 
//Also takes a less amount of time to finish all the tests*/

//creates auth user
beforeAll(function (done){

  var pass = 'ilikehottea';
  var salt = bcrypt.hashSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  var pass2 = 'password';
  var hash2 = bcrypt.hashSync(pass2, salt);

  User.create({
    full_name: 'Auth User',
    username: 'authUserYo',
    email: 'tea@pot.com',
    password: hash,
    bio: 'bio'
  }, function(err, newUser){
      if(err){
        console.log(err);
        done.fail(err);
      }else{
        authUser = newUser;
        
        User.create({
          full_name: 'Weirdo Yo',
          username: 'weirdo',
          email: 'weirdo@email.com',
          password: hash2
        }, function (err, user2){
          if(err){
            done.fail(err);
          }else{
            user = user2;
            loginUser(auth, done);
          }
        });
      }
    });
});

afterAll(function (done) {
  User.remove({_id: authUser._id}, function (err, removedUser){
    if(err){
      done.fail(err);
    }else{ 
      User.remove({_id: user._id}, function (err, removedUser2){
        if(err){
          done.fail(err);
        }else{
          done();
        }
      })
    }
  });
});


describe('UsersController', function() {
  
  describe('tests with data', function() {

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
                  done.fail(err);
                }else{
                  newUser.remove(function (err){
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
      });

    //update user
    it('should update a user', function (done){
      request(app)
      .post('/api/user/edit/' + user._id)
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
          User.findOne({_id: user._id}, function (err, updatedUser){
            if(err){
              done.fail(err);
            }else{
              expect(updatedUser.email).toBe('test4@test.com');
              done();
            }
          })
        }
      })
    });

    //delete user
    it('should delete a user', function (done){
      request(app)
      .post('/api/user/delete/' + user._id)
      .set('x-access-token', auth.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end( function (err, res){
        if(err){
          done.fail(err);
        }else{
          User.findOne({_id: user._id})
          .remove(function (error){
            User.findOne({_id: user._id} , function (err, deletedUser){
              if(err){
                console.log(err);
              } else{
                return done();
              }
            });
          });
        }
      });
    });
  });
});

//authUser logging in 
function loginUser(auth,done){
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



