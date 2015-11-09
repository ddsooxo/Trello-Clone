(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ItemController', function ($scope, $http) {
      
      $scope.formData = {};
      $scope.todos = [];

      //show items
      $http.get('/api/items')
         .success(function(data) {
             $scope.todos = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create item
      $scope.createItem = function () {
        $http.post('/api/item/create', $scope.formData)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //delete item
      $scope.removeItem = function (id) {
        $http.post('/api/item/delete/' + id)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update item
      $scope.editItem = function (id, item_title) {
        $http.post('/api/edit/' + id + '?item_title=' + item_title)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();
