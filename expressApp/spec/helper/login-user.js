module.exports.loginUser = function (auth, email, password, request, done) {
  request
    .post('/api/login')
    .send({
      email: email,
      password: password
    })
    .expect(200)
    .end(function (err, res) {
      auth.token = res.body.token;
      done();
    });        
}