
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('RegisterController', ['UserService','$routeParams', function (UserService, $routeParams) {
      
      var vm = this;
      vm.users = [];
      vm.formData = {};
      var userId = $routeParams.user_id;
      vm.userId = $routeParams.user_id;
      
      //register a new user
      vm.register = function () {     
        UserService.register(vm.formData)
          .then(function (data){
            vm.users.push(data);
            var successRegister = document.getElementById('successRegister');
            successRegister.innerHTML = 'Congratulations' + vm.formData.full_name + ' ,You have successfully created your account. Click back to login';
            successRegister.style.display = 'block';
          })
          .catch(function(err) {
          console.log('createdUser error: ' + err);
        });
      }
    }]);
})();
