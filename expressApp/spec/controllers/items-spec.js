var request = require('supertest');
var Item = require('../../app/models/item');
var List = require('../../app/models/list');
// var List = require('../../app/models/list');
var ItemsController = require('../../app/controllers/items');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ItemsController', function() {
  describe('with data', function() {
    var item;
    var list;

    beforeEach(function(done) {
      Item.find({_list: '564122f61b4d89a52b92b585'}, function(err, newItem) {
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          console.log('newItem: ', newItem);
          item = newItem;
          done();
       }
      });
    });


    it('should return list of items', function (done) {
      request(app).get('/api/items/' + list.id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.params).toBeDefined();
          done();
        }
      })
    });

    afterEach(function(done) {
      item.remove(function(err, removedItem) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });


    // //delete a exercise
    // it('should delete an item', function(done) {
    //   var options = {
    //     url: 'http://localhost:3000/api/item/delete/' + item.id
    //   };

    //   request.post(options, function(error, response, body) {
    //     expect(response.statusCode).toBe(302);
    //     new Item({
    //       id: item.id
    //     })
    //     .fetch()
    //     .then(function(deletedItem) {
    //       expect(deletedItem).toBeNull();
    //       done();
    //     });
    //   });
    // });

  });
});

