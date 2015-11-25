
(function() {
  'use strict';

  angular.module('mytodo')
    .controller('LoginController', ['AuthenticationService','$location', function (AuthenticationService, $location) {
        var vm = this;   
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        
        vm.login = function () {
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                vm.dataLoading = true;
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, response.token);
                    $location.path('/boards');
                } else {
                    //if login fails
                    var notification = document.getElementById('notification');
                    notification.innerHTML = 'Invalid Email/Password. Please Try Again';
                    notification.style.display = 'block';
                    
                    console.log(response);
                    vm.dataLoading = false;
                }
            });
        }

    }]);
})();














