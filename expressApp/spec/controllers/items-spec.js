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
      List.create({list_title: 'test list title'}, function (err, newList){
        if (err) {
          console.log(err);
          // done.fail(err);
        } else {
          console.log('newList: ', newList);
          list = newList;
          Item.create({item_title: 'test item title', _list: list.id}, function (err, newItem) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              console.log('newItem: ', newItem);
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
      request(app).get('/api/items/' + list.id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          done.fail(err);
        }else {
          expect(res.body.length).toEqual(1);
          returneditem = res.body[0];
          expect(returneditem.item_title).toEqual(item.item_title);

          // expect(list.list_title).toBe('test list title');
          // expect(item.item_title).toBe('test item title');
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

