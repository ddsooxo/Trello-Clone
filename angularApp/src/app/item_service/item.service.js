(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http','$q', function ($http, $q) {
      var service = {};   
      var todos = [];
      var formData = {};


      service.getItems = function(listId){
        console.log(listId);
        var deferred = $q.defer();
        $http.get('/api/items/' + listId)
           .success(function (data) {
               console.log(data);
               deferred.resolve({todos: data});
           })
           .error(function(data) {
            deferred.resolve({todos: data});
               console.log('Error: ' + data);
           });
           return deferred.promise;
      }

      // create item
      service.createItem = function () {
        formData.listId = listId;
        var deferred = $q.defer();
        $http.post('/api/item/create', formData)
           .success(function(data) {
              deferred.resolve({todos: data});
              console.log(data);
           })
           .error(function(data) {
              deferred.resolve({todos: data});
              console.log('Error: ' + data);
           });
      };
        
      //delete item
      service.removeItem = function (id) {
        $http.post('/api/item/delete/' + id + '?list_id=' + service.listId)
           .success(function(data) {
               service.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update item
      service.editItem = function (id, item_title) {
        $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + service.listId)
           .success(function(data) {
               service.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };

      return service;
    }]);
})();