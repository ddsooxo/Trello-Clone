// (function() {
//   'use strict';

// var vm = this;
// vm.formData = {};
// vm.boards = [];
// var userId = $routeParams.user_id;
// vm.userId = $routeParams.user_id;
// vm.user_full_name = $routeParams.full_name;

//   angular.module('mytodo')
//     .factory('BoardService', ['$http','$q', function ($http, $q) {
//       var service = {};  

//       service.getBoards = function(userId){
//         console.log('getBoards: ', userId);
//         var deferred = $q.defer();
//         $http.get('/api/boards?user_id=' + userId)
//            .success(function (data) {
//                console.log(data);
//                deferred.resolve(data);
//            })
//            .error(function(data) {
//             console.log('Error: ', data);
//             deferred.reject('Error: ' + data);
//            });
//            return deferred.promise;
//       }

      // // create item
      // service.createItem = function (formData) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/create', formData)
      //      .success(function (data) {
      //         deferred.resolve(data);
      //         console.log(data);
      //      })
      //      .error(function (data) {
      //         deferred.reject(data);
      //         console.log('Error: ' + data);
      //      });
      //      return deferred.promise;
      // };
        
      // //delete item
      // service.removeItem = function (id, userId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/delete/' + id + '?user_id=' + userId)
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
      // service.editItem = function (id, item_title, userId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&user_id=' + userId)
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

//       return service;
//     }]);
// })();