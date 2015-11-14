// (function() {
//   'use strict';

//   angular.module('mytodo')
//     .controller('ItemController', ['$routeParams','$http', function ($routeParams, $http) {
//       //add properties to scope i.e: todos, list_title, later available for view
//       var vm = this;     
//       vm.formData = {};
//       vm.listId = $routeParams.list_id;
//       vm.todos = [];
//       vm.list_title = $routeParams.list_title;
//       vm.boardId = $routeParams.board_id;
//       vm.board_title = $routeParams.board_title;
//       console.log('boardId: ', vm.boardId);
//       console.log('board_title: ', vm.board_title);


//       //show items
//       $http.get('/api/items/' + '?list_id=' + vm.listId)
//          .success(function(data) {
//              vm.todos = data;
//              console.log(data);
//          })
//          .error(function(data) {
//              console.log('Error: ' + data);
//          });

//       // create item
//       vm.createItem = function () {
//         vm.formData.list_id = vm.listId;
//         $http.post('/api/item/create', vm.formData)
//            .success(function(data) {
//                vm.todos = data;
//                console.log(data);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
        
//       //delete item
//       vm.removeItem = function (id) {
//         $http.post('/api/item/delete/' + id + '?list_id=' + vm.listId)
//            .success(function(data) {
//                vm.todos = data;
//                console.log(data);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
        
//       //update item
//       vm.editItem = function (id, item_title) {
//         $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + vm.listId)
//            .success(function(data) {
//                vm.todos = data;
//                console.log(data);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
//     }]);
// })();
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
          console.log('getItems error: ' + err);
        });
          console.log('vm.todos: ', vm.todos);
      }


      // // create item
      // vm.createItem = function () {
      //   vm.formData.list_id = vm.listId;
      //   $http.post('/api/item/create', vm.formData)
      //      .success(function(data) {
      //          vm.todos = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //delete item
      // vm.removeItem = function (id) {
      //   $http.post('/api/item/delete/' + id + '?list_id=' + vm.listId)
      //      .success(function(data) {
      //          vm.todos = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //update item
      // vm.editItem = function (id, item_title) {
      //   $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + vm.listId)
      //      .success(function(data) {
      //          vm.todos = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
    }]);
})();
