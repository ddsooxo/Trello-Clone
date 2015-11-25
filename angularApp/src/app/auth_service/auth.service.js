(function () {
  'use strict';

  angular
      .module('mytodo')
      .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    console.log('$rootScope.globals: ', $rootScope.globals);
    return service;

    // Use the email and password to login. The Callback will receive and object with the username and token
    function Login(email, password, callback) {

      $http.post('/api/login', { email: email, password: password })
         .success(function (res) {
            console.log('res: ', res);
            callback({ success: res.success, email: email, token: res.token });
         });

    }

    // Store credentials for reuse. They are stored in $rootScope for the current app session.
    // Stored in the $cookieStore for use if the app is reloaded
    function SetCredentials(email, token) {
      $rootScope.globals = {
        currentUser: {
          email: email,
          token: token
        }
      };

      $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
      // console.log($http.defaults.headers.common['X-ACCESS-TOKEN']);
      $cookieStore.put('globals', $rootScope.globals);
    }

    // leanup the stored credentials
    function ClearCredentials() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }
})();