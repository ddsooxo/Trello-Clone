
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ItemController', ['$routeParams','ItemService', function ($routeParams, ItemService) {
      var vm = this;     
      vm.formData = {};
      vm.items = [];
      var listId = $routeParams.list_id;
      vm.listId = $routeParams.list_id;
      vm.list_title = $routeParams.list_title;
      vm.boardId = $routeParams.board_id;
      vm.board_title = $routeParams.board_title;

      console.log('$routeParams.board_title: ', $routeParams.board_title);
      
      //show items
      ItemService.getItems(vm.listId)
        .then(function (data){
          vm.items = data;
        })
        .catch(function(err) {
        });

      //create a new item
      vm.createItem = function () {
        vm.formData.list_id = vm.listId;
        ItemService.createItem(vm.formData)
          .then(function (data){
            vm.items.push(data);
          })
          .catch(function(err) {
          console.log('createItem error: ' + err);
        });
      }

      //delete item
      vm.removeItem = function (id, listId) {
        vm.formData.list_id = vm.listId;
        vm.formData.id = id;
        ItemService.removeItem(vm.formData.id, listId)
          .then(function (data){
            for(var index = 0; index < vm.items.length; index++){
              if(vm.items[index]._id === data._id){
                vm.items.splice(index,1);
                break;
              } 
            }
          })
          .catch(function (err){
            console.log('createItem error: ' + err);
          });
      };
       
      //edit item
      vm.editItem = function (id, item_title) {
        ItemService.editItem(id, item_title, vm.listId)
          .then(function (data){
          })
          .catch(function(err) {
            var notification = document.getElementById('notification');
            notification.innerHTML = 'There was an error updating your item';
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
