(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ListController', function ($scope, $routeParams, $http) {
      
      $scope.formData = {};
      $scope.lists = [];
      $scope.boardId = $routeParams.board_id;
      $scope.board_title = $routeParams.board_title;
      console.log($scope.board_title);
      
      //show lists
      $http.get('/api/lists?board_id=' + $routeParams.board_id)
         .success(function(data) {
             $scope.lists = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create list
      $scope.createList = function () {
        $scope.formData.board_id = $scope.boardId;
         console.log('blah', $scope.formData);
        $http.post('/api/list/create', $scope.formData)
           .success(function(data) {
               $scope.lists = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //delete list
      $scope.removeList = function (id) {
        $http.post('/api/list/delete/' + id)
           .success(function(data) {
               $scope.lists = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update list
      $scope.editList = function (id, list_title) {
        $http.post('/api/list/edit/' + id + '?list_title=' + list_title + '&board_id=' + $scope.boardId)
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();
