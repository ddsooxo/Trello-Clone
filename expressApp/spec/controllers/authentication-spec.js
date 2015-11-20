var request = require('supertest');
var app = require('../../app').app;

describe('AuthenticationController', function() {

  it('should authenticate the user', function (done) {
    request(app).post('/authenticate')
    .send({
      email: 'tea@pot.com',
      password: 'ilikehottea'
    })      
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      expect(err).toBeNull();
      console.log('res.body: ',res.body);
      done();
    });    
  });

  it('should not authenticate the user', function (done) {
    request(app).post('/authenticate')
    .send({
      email: 'user@test2.com',
      password: 'password1'
    })      
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function(err, res){
      expect(err).toBeDefined();
      done();
    });  
  });
});