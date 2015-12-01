(function() {
  'use strict';

  angular.module('mytodo')
    .controller('BoardController', ['BoardService', '$routeParams', function (BoardService, $routeParams) {
      var vm = this;
      vm.formData = {};
      vm.boards = [];
      vm.full_name = $routeParams.full_name;

      //show boards
      BoardService.getBoards(vm.userId)
        .then(function (data) {
          vm.boards = data;
          console.log('vm.boards: ', vm.boards);
        })
        .catch(function(err) {
          console.log('getBoards error: ' + err);
        });

      //create board
      vm.createBoard = function (){
        console.log('im here ')
        BoardService.createBoard(vm.formData)
          .then(function (data){
            vm.boards = data;
          })
          .catch(function(err) {
          console.log('createBoards error: ' + err);
        });
      }

      // // create board
      // vm.createBoard = function () {
      //   $http.post('/api/board/create',vm.formData)
      //      .success(function(data) {
      //         vm.boards = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //delete board
      // vm.removeBoard = function (id) {
      //   $http.post('/api/board/delete/' + id)
      //      .success(function(data) {
      //         vm.boards = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //update board
      // vm.editBoard = function (id, title) {
      //   $http.post('/api/board/edit/' + id + '?title=' + title)
      //      .success(function(data) {
      //         vm.boards = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };

    }]);
})();
