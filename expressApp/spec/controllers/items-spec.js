var request = require('supertest');
var Item = require('../../app/models/item');
// var List = require('../../app/models/list');
var ItemsController = require('../../app/controllers/items');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ItemsController', function() {

  describe('tests without data', function() {

    it('should return an empty list of items', function (done) {
      request(app).get('/api/items')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body).toEqual([]);
          done();
        }
      })
    });
    
//     // //create new todo
    // it('should create a new item', function(done) {
    //   var options = {
    //     url: 'http://localhost:3000/api/item/create',
    //     form: {
    //       item_title: 'test item title'
    //     }
    //   };
    //   request.post(options, function(error, response, body) {
    //     expect(response.statusCode).toBe(302);
    //     new Item({
    //       item_title: 'test item title'
    //     })
    //     .save()
    //     .then(function(createdItem) {
    //       expect(createdItem.item_title).toBeDefined();
    //       new Item({
    //         item_title: createdItem.item_title
    //       })
    //       .destroy();
    //       done();
    //     });
    //   });
    // });
  });

  
  // describe('tests with data', function() {
  //   var item;
  //   beforeEach(function(done) {
  //     new Item({
  //       item_title: 'test item_title'
  //     })
  //     .save()
  //     .then(function(newItem) {
  //       item = newItem;
  //       done();
  //     });
  //   });

  //   afterEach(function(done) {
  //     new Item({
  //       id: item.id
  //     }).destroy()
  //       .then(done)
  //       .catch(function(error) {
  //         done.fail(error);
  //       });
  //   });

  //   //delete a exercise
  //   it('should delete an item', function(done) {
  //     var options = {
  //       url: 'http://localhost:3000/api/item/delete/' + item.id
  //     };

  //     request.post(options, function(error, response, body) {
  //       expect(response.statusCode).toBe(302);
  //       new Item({
  //         id: item.id
  //       })
  //       .fetch()
  //       .then(function(deletedItem) {
  //         expect(deletedItem).toBeNull();
  //         done();
  //       });
  //     });
  //   });
  // })
});