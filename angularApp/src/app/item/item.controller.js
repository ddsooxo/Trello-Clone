
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

      console.log('$routeParams.list_id: ', $routeParams.list_id);
      
      //show items
      ItemService.getItems(vm.listId)
        .then(function (data){
          vm.items = data;
          console.log('vm.items: ', vm.items);
        })
        .catch(function(err) {
          console.log('getItems error: ' + err);
        });

      //create a new item
      vm.createItem = function () {
        vm.formData.list_id = vm.listId;
        console.log('vm.formData: ', vm.formData);
        ItemService.createItem(vm.formData)
          .then(function (data){
            vm.items.push(data);
          })
          .catch(function(err) {
          console.log('createItem error: ' + err);
        });
          console.log('created vm.items: ', vm.items);
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
          console.log('removeItem vm.items: ', vm.items);
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
          console.log('editItem vm.items: ', vm.items);
      }

    }]);
})();
