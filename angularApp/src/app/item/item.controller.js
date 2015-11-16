
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ItemController', ['$routeParams','ItemService', function ($routeParams, ItemService) {
      //add properties to scope i.e: todos, list_title, later available for view
      var vm = this;     
      vm.formData = {};
      vm.todos = [];
      var listId = $routeParams.list_id;
      var list_title = $routeParams.list_title;
      vm.boardId = $routeParams.board_id;
      vm.board_title = $routeParams.board_title;

      //show items
      ItemService.getItems(listId)
        .then(function (data){
          vm.todos = data;
        })
        .catch(function(err) {
          console.log('getItems error: ' + err);
        });
        console.log('vm.todos: ', vm.todos);

      //create a new item
      vm.createItem = function () {
        vm.formData.list_id = listId;
        console.log('vm.formData: ', vm.formData);
        ItemService.createItem(vm.formData)
          .then(function (data){
            vm.todos.push(data);
          })
          .catch(function(err) {
          console.log('createItem error: ' + err);
        });
          console.log('created vm.todos: ', vm.todos);
      }

      //delete item
      vm.removeItem = function (id) {
        vm.formData.list_id = listId;
        vm.formData.id = id;
        ItemService.removeItem(vm.formData.id)
          .then(function (data){
            for(var index = 0; index < vm.todos.length; index++){
              if(vm.todos[index]._id === data._id){
                vm.todos.splice(index,1);
                break;
              } 
            }
          })
          .catch(function (err){
            console.log('createItem error: ' + err);
          });
          console.log('removeItem vm.todos: ', vm.todos);
      };
       
      //edit item
      vm.editItem = function (id, item_title) {
        vm.formData.list_id = listId;
        vm.formData.id = id;
        vm.formData.item_title = item_title;
        ItemService.editItem(vm.formData.item_title, vm.formData.id)
          .then(function (data){
            vm.todos.push(data);
          })
          .catch(function(err) {
          console.log('editItem error: ' + err);
        });
          console.log('editItem vm.todos: ', vm.todos);
      } 

    }]);
})();
