(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', ['$http','$q', function ($http, $q) {
      var service = {};  

      // create item
      service.register = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/user/register', formData)
           .success(function (data) {
              deferred.resolve(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error. Failed to register User: ' + data);
           });
           return deferred.promise;
      };
        
      //delete user
      service.removeUser = function (id) {
        var deferred = $q.defer();
        $http.post('/api/user/delete/' + id)
           .success(function (data) {
              deferred.resolve(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };
        
      //update item
      service.editUser = function (id, formData) {
        var deferred = $q.defer();
        $http.post('/api/item/edit/' + id + '?full_name=' + vm.formData.full_name)
           .success(function (data) {
               deferred.resolve(data);
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