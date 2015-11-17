(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http','$q', function ($http, $q) {
      var service = {};  

      service.getItems = function(listId){
        console.log('getItems: ', listId);
        var deferred = $q.defer();
        $http.get('/api/items?list_id=' + listId)
           .success(function (data) {
               console.log(data);
               deferred.resolve(data);
           })
           .error(function(data) {
            console.log('Error: ', data);
            deferred.reject('Error: ' + data);
           });
           return deferred.promise;
      }

      // create item
      service.createItem = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/item/create', formData)
           .success(function (data) {
              deferred.resolve(data);
              console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };
        
      //delete item
      service.removeItem = function (id, listId) {
        var deferred = $q.defer();
        $http.post('/api/item/delete/' + id + '?list_id=' + listId)
           .success(function (data) {
              deferred.resolve(data);
               console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };
        
      //update item
      service.editItem = function (id, item_title, listId) {
        var deferred = $q.defer();
        $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + listId)
           .success(function (data) {
               deferred.resolve(data);
               console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };

      return service;
    }]);
})();