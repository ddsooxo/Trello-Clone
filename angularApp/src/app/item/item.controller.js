(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ItemController', ['$routeParams','$http', function ($routeParams, $http) {
      //add properties to scope i.e: todos, list_title, later available for view
      var vm = this;     
      vm.formData = {};
      vm.listId = $routeParams.list_id;
      vm.todos = [];
      vm.list_title = $routeParams.list_title;

      //show items
      $http.get('/api/items/' + $routeParams.list_id)
         .success(function(data) {
             vm.todos = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create item
      vm.createItem = function () {
        vm.formData.list_id = vm.listId;
        $http.post('/api/item/create', vm.formData)
           .success(function(data) {
               vm.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //delete item
      vm.removeItem = function (id) {
        $http.post('/api/item/delete/' + id + '?list_id=' + vm.listId)
           .success(function(data) {
               vm.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update item
      vm.editItem = function (id, item_title) {
        $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + vm.listId)
           .success(function(data) {
               vm.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    }]);
})();
