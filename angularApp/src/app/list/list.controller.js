(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ListController', ['$routeParams','ListService', function ($routeParams, ListService) {
      
      var vm = this;
      vm.formData = {};
      vm.lists = [];
      var boardId = $routeParams.board_id;
      vm.boardId = $routeParams.board_id;
      vm.board_title = $routeParams.board_title;
      console.log('vm.formData: ', vm.formData);
      
     
      //show lists
      ListService.getLists(vm.boardId)
        .then(function (data){
          vm.lists = data;
          console.log('vm.lists: ', vm.lists);
        })
        .catch(function(err) {
          console.log('getLists error: ' + err);
        });

      // create a new list
      vm.createList =  function(){ 
        vm.formData.board_id = vm.boardId;
        console.log('vm.formData: ', vm.formData);
        ListService.createList(vm.formData)
          .then(function (data){
            vm.lists.push(data);
          })
          .catch(function (err){
            console.log('createList error: ', err);
          })
          console.log('vm.lists: ', vm.lists);
      }



      // vm.createList = function () {
      //   vm.formData.board_id = vm.boardId;
      //    console.log('blah', vm.formData);
      //   $http.post('/api/list/create', vm.formData)
      //      .success(function(data) {
      //          vm.lists = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //delete list
      // vm.removeList = function (id) {
      //   $http.post('/api/list/delete/' + id)
      //      .success(function(data) {
      //          vm.lists = data;
      //          console.log(data);
      //      })
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
        
      // //update list
      // vm.editList = function (id, list_title) {
      //   $http.post('/api/list/edit/' + id + '?list_title=' + list_title + '&board_id=' + vm.boardId)
      //      .error(function(data) {
      //          console.log('Error: ' + data);
      //      });
      // };
    }]);
})();



// (function() {
//   'use strict';

//   angular.module('mytodo')
//     .controller('ListController', function ($scope, $routeParams, $http) {
      
//       $scope.formData = {};
//       $scope.lists = [];
//       $scope.boardId = $routeParams.board_id;
//       $scope.board_title = $routeParams.board_title;
//       console.log($scope.board_title);
      
//       //show lists
//       $http.get('/api/lists?board_id=' + $routeParams.board_id)
//          .success(function(data) {
//              $scope.lists = data;
//              console.log(data);
//          })
//          .error(function(data) {
//              console.log('Error: ' + data);
//          });

//       // create list
//       $scope.createList = function () {
//         $scope.formData.board_id = $scope.boardId;
//          console.log('blah', $scope.formData);
//         $http.post('/api/list/create', $scope.formData)
//            .success(function(data) {
//                $scope.lists = data;
//                console.log(data);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
        
//       //delete list
//       $scope.removeList = function (id) {
//         $http.post('/api/list/delete/' + id)
//            .success(function(data) {
//                $scope.lists = data;
//                console.log(data);
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
        
//       //update list
//       $scope.editList = function (id, list_title) {
//         $http.post('/api/list/edit/' + id + '?list_title=' + list_title + '&board_id=' + $scope.boardId)
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//       };
//     });
// })();
