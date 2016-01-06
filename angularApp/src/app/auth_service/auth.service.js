(function () {
  'use strict';

  angular
      .module('mytodo')
      .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.login = login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    //show current user logged in:
    return service;

    // Use the email and password to login. The Callback will receive and object with the username and token
    function login(email, password, callback) {

      $http.post('/api/login', { email: email, password: password })
         .success(function (res) {
            callback({ success: res.success, email: email, token: res.token, id: res._id});
         });

    }

    // Store credentials for reuse. They are stored in $rootScope for the current app session.
    // Stored in the $cookieStore for use if the app is reloaded
    function SetCredentials(email, token, id) {
      $rootScope.globals = {
        currentUser: {
          email: email,
          token: token,
          _id: id
        }
      };

      $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
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