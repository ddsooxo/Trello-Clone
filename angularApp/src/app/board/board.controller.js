(function() {
  'use strict';

  angular.module('mytodo')
    .controller('BoardController', ['$routeParams', '$http', function ($routeParams, $http) {
      var vm = this;
     vm.formData = {};
     vm.boards = [];
     var userId = $routeParams.user_id;
     vm.userId = $routeParams.user_id;



      //show boards
      $http.get('/api/boards')
         .success(function(data) {
            vm.boards = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      // create board
     vm.createBoard = function () {
        $http.post('/api/board/create',vm.formData)
           .success(function(data) {
              vm.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //delete board
     vm.removeBoard = function (id) {
        $http.post('/api/board/delete/' + id)
           .success(function(data) {
              vm.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //update board
     vm.editBoard = function (id, title) {
        $http.post('/api/board/edit/' + id + '?title=' + title)
           .success(function(data) {
              vm.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    }]);
})();
