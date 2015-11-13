(function() {
  'use strict';

  angular.module('mytodo')
    .controller('BoardController', function ($scope, $http) {
      
      $scope.formData = {};
      $scope.boards = [];

      //show boards
      $http.get('/api/boards')
         .success(function(data) {
             $scope.boards = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create board
      $scope.createBoard = function () {
        $http.post('/api/board/create', $scope.formData)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //delete board
      $scope.removeBoard = function (id) {
        $http.post('/api/board/delete/' + id)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update board
      $scope.editBoard = function (id, title) {
        $http.post('/api/board/edit/' + id + '?title=' + title)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();
