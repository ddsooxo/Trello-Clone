var request = require('supertest');
var Board = require('../../app/models/board');
var List = require('../../app/models/list');
var Item = require('../../app/models/item');
var ItemsController = require('../../app/controllers/items');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ItemsController', function() {

  describe('without data', function(){

    //return items
    it('should return list of items of a list', function (done) {
      request(app).get('/api/items')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toBeDefined();
          done();
        }
      });
    });

  })


  describe('with data', function() {
    var item;
    var list;

    var newItem = function(res) {
      res.body.should.have.property('item_title', 'Item Test Title1');
    };

    beforeEach(function (done) {
      List.create({list_title: 'List Test Title1'}, function (err, newList){
        if (err) {
          console.log(err);
        } else {
          list = newList;

          Item.create({item_title: 'Item Test Title1', _list: list.id}, function (err, newItem) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              item = newItem;
              done();
           }
          });
        }
      })
    });



    afterEach(function (done) {
      list.remove(function (err, removedList){
        if(err){
          console.log(err);
          // done.fail(err);
        } else{
          item.remove(function (err, removedItem) {
            if (err) {
            } else {
              done();
            }
          });
        }
      });
    });


    //return a new created item
    it('should create a new item in a list', function (done) {  
      request(app).post('/api/item/create')
      .send({
        item_title: 'Item Test Title1',
        _list: list._id
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.item_title).toEqual('Item Test Title1');
          Item.remove({item_title: 'Item Test Title1'}, function (err, deletedItem){
            if(err){
              done.fail.err('Failed to remove item with data');
            }else{
              done();
            }
          })
        }
      })
    });

    //delete an item of a list
    // it('should delete an item of a list', function (done) {
    //   request(app).post('/api/item/delete/' + item._id)
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body).toBeUndefined();
    //       console.log(res.body);
    //       done();
    //     }
    //   })
    // });

    // //update an item of a list
    // it('should udate an item of a list', function (done) {
    //   request(app).post('/api/item/edit/' + item._id + '?list_id=' + list._id)
    //   .expect(200)
    //   .field('item_title', 'Updated test item title')
    //   .expect('Content-Type', /json/)
    //   .end(function (err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(item.item_title).toEqual('Updated test item title');
    //       expect(res.body.length).toEqual(1);
    //       done();
    //     }
    //   })
    // });

  });
});

