var request = require('supertest');
var Board = require('../../app/models/board');
var List = require('../../app/models/list');
var Item = require('../../app/models/item');
var ItemsController = require('../../app/controllers/items');
// var session = require('supertest-session');
var app = require('../../app').app;

describe('ItemsController', function() {
  describe('with data', function() {
    var item;
    var list;

    beforeEach(function(done) {
      List.create({list_title: 'test list title'}, function (err, newList){
        if (err) {
          console.log(err);
          // done.fail(err);
        } else {
          // console.log('newList: ', newList);
          list = newList;

          Item.create({item_title: 'test item title', _list: list.id}, function (err, newItem) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              // console.log('newItem: ', newItem);
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

    // //return a new created item
    // it('should return list of items of a list', function (done) {
    //   request(app).get('/api/item/create')
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function(err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body.length).toEqual(1);
    //       returneditem = res.body[0];
    //       expect(returneditem.item_title).toEqual(item.item_title);
    //       done();
    //     }
    //   })
    // });

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
    // //delete a exercise
    // it('should delete an item', function (done) {
    //   request(app).post('/api/item/delete/' + item.id)
    //   .expect(200)
    //   .expect('Content-Type', /json/)
    //   .end(function(err, res){
    //     if(err){
    //       done.fail(err);
    //     }else {
    //       expect(res.body).tobeNull();
    //       done();
    //     }
    //   })
    // });


  });
});

