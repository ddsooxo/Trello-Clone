(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', ['$http','$q', function ($http, $q) {
      var service = {};  

      // create item
      service.register = function (formData) {
        var deferred = $q.defer();
        console.log('userService - formData: ', formData);
        $http.post('/api/user/register', formData)
           .success(function (data) {
              deferred.resolve(data);
              console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error. Failed to register User: ' + data);
           });
           return deferred.promise;
      };
        
      // //delete item
      // service.removeItem = function (id, listId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/delete/' + id + '?list_id=' + listId)
      //      .success(function (data) {
      //         deferred.resolve(data);
      //          console.log(data);
      //      })
      //      .error(function (data) {
      //         deferred.reject(data);
      //         console.log('Error: ' + data);
      //      });
      //      return deferred.promise;
      // };
        
      // //update item
      // service.editItem = function (id, item_title, listId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + listId)
      //      .success(function (data) {
      //          deferred.resolve(data);
      //          console.log(data);
      //      })
      //      .error(function (data) {
      //         deferred.reject(data);
      //         console.log('Error: ' + data);
      //      });
      //      return deferred.promise;
      // };

      return service;
    }]);
})();