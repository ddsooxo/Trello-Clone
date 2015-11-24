
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
        console.log('vm.formData', vm.formData);        
        console.log('vm.formData.full_name', vm.formData.full_name);        
        UserService.register(vm.formData)
          .then(function (data){
            vm.users.push(data);
            var successRegister = document.getElementById('successRegister');
            successRegister.innerHTML = 'Congratulations' + vm.formData.full_name + ' ,You have successfully created your account. Click back to login';
            successRegister.style.display = 'block';
            
            // //user notification of successful registering will time out in 3000 miliseconds(3 seconds)
            // setTimeout(function (){
            //   var successRegister = document.getElementById('successRegister');
            //   successRegister.style.display = 'none';
            //   successRegister.innerHTML = '';
            // }, 3000);
          })
          .catch(function(err) {
          console.log('createdUser error: ' + err);
        });
          console.log('created vm.users: ', vm.users);
      }
    }]);
})();
