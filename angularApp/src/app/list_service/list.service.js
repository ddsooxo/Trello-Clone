(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ListService', ['$http','$q', '$rootScope', function ($http, $q, $rootScope) {
      var service = {};  

      //show Lists
      service.getLists = function(boardId){
        console.log('getLists() > boardId: ', boardId);
        var deferred = $q.defer();
        $http.get('/api/lists?board_id=' + boardId)
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

      // create list
      service.createList = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/list/create', formData)
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
        
      //delete list
      service.removeList = function (id, listId) {
        var deferred = $q.defer();
        $http.post('/api/list/delete/' + id + '?list_id=' + listId)
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
        
      //update list
      service.editList = function (id, list_title, listId) {
        var deferred = $q.defer();
        $http.post('/api/list/edit/' + id + '?list_title=' + list_title + '&list_id=' + listId)
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