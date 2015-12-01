(function() {
  'use strict';

  angular.module('mytodo')
    .factory('BoardService', ['$http','$q', '$rootScope', function ($http, $q, $rootScope) {
      var service = {};  
      var currentUser = $rootScope.globals.currentUser._id;

      //show boards with users
      service.getBoards = function(userId){
        console.log('currentUser: ', currentUser);
        var deferred = $q.defer();
        $http.get('/api/boards?user_id=' + currentUser)
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

      // create board
      service.createBoard = function (formData) {
        var deferred = $q.defer();
        formData.userId = currentUser;
        console.log('im in createBoard')
        $http.post('/api/board/create', formData)
           .success(function (data) {
              deferred.resolve(data);
              console.log('i succeeded',data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };
        
      //delete board
      service.removeBoard = function (id, userId) {
        var deferred = $q.defer();
        $http.post('/api/board/delete/' + id + '?user_id='+ currentUser)
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
        
      //update board
      service.editBoard = function (id, title, userId) {
        var deferred = $q.defer();
        $http.post('/api/board/edit/' + id + '?title=' + title + '&user_id=' + currentUser)
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