
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('RegisterController', ['UserService','$routeParams', function (UserService, $routeParams) {
      //add properties to scope i.e: todos, list_title, later available for view
      
      var vm = this;
      vm.users = [];
      vm.formData = {};
      var userId = $routeParams.user_id;
      vm.userId = $routeParams.user_id;
      
      //register a new user
      vm.register = function () {
        // vm.formData.user_id  = vm.userId;
        console.log('user; vm.formData: ', vm.formData);
        UserService.register(vm.formData)
          .then(function (data){
            vm.users.push(data);
            var successfulRegister = document.getElementById('successRegister');
            succesfulRegister.innerHTML = 'Congratulations! You have successfully created your account';
          })
          .catch(function(err) {
          console.log('createdUser error: ' + err);
        });
          console.log('created vm.users: ', vm.users);
      }
    }]);
})();
