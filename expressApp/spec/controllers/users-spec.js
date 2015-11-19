var request = require('supertest');
var User = require('../../app/models/user');
var UsersController = require('../../app/controllers/users');

var app = require('../../app').app;

var auth = {};
var authUser;

// TODO: Ask Kirk, why pass auth?
beforeAll(loginUser(auth));

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

describe('UsersController', function() {

  // describe('without data', function(){

   // it('should login a user', function (done) {
   //    request(app).post('/api/login')
   //    .send({
   //      email:'test2@email.com',
   //      password: 'test2 password'
   //    })
   //    .expect(422)
   //    .expect('Content-Type', /json/)
   //    .end(function (err, res){
   //      if(err){
   //        done.fail(err);
   //      } else{
   //        done();
   //      }
   //    })
   //  });
    
    // //create new user
    // it('should create a new user', function (done) {
    //   request(app).post('/api/user/register')
    //   .send({
    //     full_name: 'Test3 Full Name',
    //     username: 'test3username',
    //     email:'test4@email.com',
    //     password: 'test3 password',
    //     bio: 'test3 bio'
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body.username).toEqual('test3username');
    //       User.remove({username: 'test3username'}, function (err, deletedUser){
    //         if(err){
    //           done.fail.err('Failed to remove user.');
    //         } else{
    //           done();
    //         }
    //       });
    //     }
    //   })
    // });

  // });

  describe('tests with data', function() {
    var testUser;

    //test user to be created/destroyed
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
      console.log(testUser);
      testUser.remove(function (err){
        if(err){
          console.log(err);
          done.fail(err);
        } else{
          done();
        };
      });
    });

    // //create new user
    // it('should register a new user', function (done) {
    //   console.log('auth.token: ',auth.token);
    //   request(app)
    //   .post('/api/user/register')
    //   .set('x-access-token', auth.token)
    //   .send({
    //     full_name: 'test full name',
    //     username: 'username',
    //     email:'test@test.com',
    //     password: 'test3password',
    //     bio: 'test test bio'
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body.email).toEqual('test@test.com');
    //       // User.remove({email: 'test@test.com'}, function (err, deletedUser){
    //       //   if(err){
    //       //     done.fail.err('Failed to remove user with data.');
    //       //   } else{
    //       //     done();
    //       //   }
    //       // });
    //     }
    //   })
    // });

    //delete user
    it('should delete a user', function (done){
      console.log('auth.token: ', auth.token);
      console.log('test user id: ', testUser._id);
      request(app)
      .post('/api/user/delete/' + testUser._id)
      .set('x-access-token', auth.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end( function (err, res){
        if(err){
          done.fail(err);
        }else{
          User.findOne({ email: 'before@each.com'}, function (err, deletedUser){
            if(err){
              console.log(err);
            } else{
              console.log('deletedUser:', deletedUser);
              return done();
              // expect(res.body.length).toBe(0);
              // var returnedUser = res.body[0];
              // console.log('returnedUser: ',returnedUser);
              // expect(returnedUser).toBeUndefined();
            }
          })
          // done();
        }
      })
    });

    // //update user
    // it('should update a user', function (done){
    //   request(app).post('/api/user/edit/' + user._id)
    //   .send({
    //     full_name: 'test 4',
    //     username: 'test4',
    //     email: 'test4@test.com',
    //     password: 'password4',
    //     bio: 'hello4'
    //   })
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end( function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else{
    //       console.log('res.body:', res.body);
    //       var returnedUser = res.body[0];
    //       expect(res.body.email).toEqual('test4@test.com');
    //       }
    //     })
    //   });

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
        console.log("res.body loginUser:", res.body);
        auth.token = res.body.token;
        return done();
      }
    };
}









