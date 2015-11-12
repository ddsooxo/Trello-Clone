var request = require('supertest');
var Item = require('../../app/models/item');
var List = require('../../app/models/list');
var ListsController = require('../../app/controllers/lists');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ListsController', function() {
  describe('with data', function() {
    var list;
    var board;

    beforeEach(function(done) {
      
      List.create({list_title: 'test list title1'}, function (err, newList){
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          console.log('newList: ', newList);
          list = newList;
          done();
        }
      })
    });



    afterEach(function(done) {
      list.remove(function (err, removedList){
        if(err){
          console.log(err);
          done.fail(err);
        } else{
          done();
        }
      });
    });

    //return a list
    it('should return a single list', function (done) {
      request(app).get('/api/lists')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.length).toEqual(1);
          returnedList = res.body[0];
          expect(returnedList.list_title).toEqual(list.list_title);
          done();
        }
      })
    });
  });
});

