(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ListController', function ($scope, $http) {
      
      $scope.formData = {};
      $scope.lists = [];

      //show lists
      $http.get('/api/lists')
         .success(function(data) {
             $scope.lists = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create list
      $scope.createList = function () {
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
        $http.post('/api/list/edit/' + id + '?list_title=' + list_title)
           .success(function(data) {
               $scope.lists = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();
