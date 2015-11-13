var request = require('supertest');
var Board = require('../../app/models/board');
var List = require('../../app/models/list');
var Item = require('../../app/models/item');
var ItemsController = require('../../app/controllers/items');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ItemsController', function() {
  // describe('without data', function(){

  // })


  describe('with data', function() {
    var item;
    var list;
    var newItem = function(res) {
      res.body.should.have.property('item_title', 'Item Test Title01');
    };


    beforeEach(function(done) {
      List.create({list_title: 'test list title in beforeEach'}, function (err, newList){
        if (err) {
          console.log(err);
          // done.fail(err);
        } else {
          list = newList;

          Item.create({item_title: 'test item title in beforeEach', _list: list.id}, function (err, newItem) {
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



    afterEach(function(done) {
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

    //return items
    it('should return list of items of a list', function (done) {
      request(app).get('/api/items/' + list._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.length).toEqual(1);
          returneditem = res.body[0];
          expect(returneditem.item_title).toEqual(item.item_title);
          done();
        }
      })
    });

    //return a new created item
    it('should create a new item in a list', function (done) {  
      request(app).post('/api/item/create')
      .send({
        item_title: 'Item Test Title01'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(newItem);
          done();
        }
      })
    });

    //delete an item of a list
    it('should delete an item of a list', function (done) {
      request(app).post('/api/item/delete/' + item._id + '?list_id=' + list._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.length).toEqual(0);
          done();
        }
      })
    });

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

