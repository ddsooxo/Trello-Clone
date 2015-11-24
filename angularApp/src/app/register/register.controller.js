
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('RegisterController', ['$routeParams','RegisterService', function ($routeParams, RegisterService) {
      //add properties to scope i.e: todos, list_title, later available for view
      
      var vm = this;
      vm.users = [];
      vm.formData = {};
      vm.boards = [];
      var boardId = $routeParams.boardId;

      console.log('$routeParams.user_id: ', $routeParams.user_id);
      
      //register a new user
      vm.register = function () {
        vm.formData.user_id  = vm.userId;
        console.log('vm.formData: ', vm.formData);
        UserService.register(vm.formData)
          .then(function (data){
            vm.users.push(data);
          })
          .catch(function(err) {
          console.log('createdUser error: ' + err);
        });
          console.log('created vm.users: ', vm.users);
      }
    }]);
})();
