(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ListController', ['$routeParams','ListService', function ($routeParams, ListService) {
      
      var vm = this;
      vm.formData = {};
      vm.lists = [];
      vm.boardId = $routeParams.board_id;
      vm.board_title = $routeParams.board_title;
      
     
      //show lists
      ListService.getLists(vm.boardId)
        .then(function (data){
          vm.lists = data;
        })
        .catch(function(err) {
          console.log('getLists error: ' + err);
        });

      // create a new list
      vm.createList =  function(){ 
        vm.formData.board_id = vm.boardId;
        ListService.createList(vm.formData)
          .then(function (data){
            vm.lists = data;
          })
          .catch(function (err){
            console.log('createList error: ', err);
          })
      }

      //delete a list
      vm.removeList = function(id, boardId){
        vm.formData.board_id = vm.boardId;
        vm.formData.id = id;
        ListService.removeList(vm.formData.id, vm.boardId)
          .then(function (){
            for(var index = 0; index < vm.lists.length; index++){
              if(vm.lists[index]._id == id){
                vm.lists.splice(index,1);
                break;
              } 
            }
          })
          .catch(function (err){
            console.log('createItem error: ' + err);
          });
      };

      //edit list
      vm.editList = function (id, list_title) {
        ListService.editList(id, list_title, vm.boardId)
          .then(function (data){
          })
          .catch(function(err) {
            var notification = document.getElementById('notification');
            notification.innerHTML = 'There was an error updating your list';
            notification.style.display = 'block';

            setTimeout(function (){
              var notification = document.getElementById('notification');
              notification.style.display = 'none';
              notification.innerHTML = '';
            }, 3000);
          });
      }
      
    }]);
})();