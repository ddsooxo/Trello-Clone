
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
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    $location.path('/boards');
                } else {
                    console.log(response);
                    vm.dataLoading = false;
                }
            });
        }

    }]);
})();


// (function () {
//     'use strict';
 
//     angular
//         .module('mytodo')
//         .controller('LoginController', LoginController);
 
//     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
//     function LoginController($location, AuthenticationService, FlashService) {
//         var vm = this;
 
//         vm.login = login;
 
//         (function initController() {
//             // reset login status
//             AuthenticationService.ClearCredentials();
//         })();
 
//         function login() {
//             vm.dataLoading = true;
//             AuthenticationService.Login(vm.email, vm.password, function (response) {
//                 if (response.success) {
//                     AuthenticationService.SetCredentials(vm.email, vm.password);
//                     $location.path('/');
//                 } else {
//                     FlashService.Error(response.message);
//                     vm.dataLoading = false;
//                 }
//             });
//         };
//     }
 
// })();

