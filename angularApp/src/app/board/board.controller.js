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
        })
        .catch(function(err) {
          console.log('getBoards error: ' + err);
        });

      //create board
      vm.createBoard = function (userId, formData){
        BoardService.createBoard(vm.formData)
          .then(function (data){
            vm.boards = data;
          })
          .catch(function(err) {
          console.log('createBoards error: ' + err);
        });
      };

      //delete board
      vm.removeBoard = function (id, userId) {
        vm.formData.id = id;
        vm.formData.userId = vm.userId;
        BoardService.removeBoard(vm.formData.id, vm.userId)
          .then(function (){
            for(var index = 0; index < vm.boards.length; index++){
              if(vm.boards[index]._id == id){
                vm.boards.splice(index,1);
                break;
              } 
            }
          })
          .catch(function(err) {
          console.log('removeBoard error: ' + err);
        });
      };
        
      //edit board
      vm.editBoard = function (id, title) {
        BoardService.editBoard(id, title, vm.userId)
          .then(function (data){
          })
          .catch(function (err){
            console.log('editBoard error: ' + err);
          });
      };

    }]);
})();
