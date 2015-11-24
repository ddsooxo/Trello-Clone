// (function() {
//   'use strict';

//   angular
//     .module('mytodo')
//     .run(runBlock);

  /** @ngInject */
//   function runBlock($log) {

//     $log.debug('runBlock end');
//   }

// })();

(function() {

  angular
    .module('mytodo')
    .run(loadAuth)
    .run(runBlock);

  loadAuth.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function loadAuth($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    // This code looks for an existing cookie when the app loads. 
    // If not found then create an empty hash
    $rootScope.globals = $cookieStore.get('globals') || {};

    // if there is a user logged in then set the headers.
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['X-ACCESS-TOKEN'] = $rootScope.globals.currentUser.token; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // The '/', '/login' and '/register' routes can be reached without a user being logged in.
      // Otherwise redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/', '/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;

      if (restrictedPage && !loggedIn) {
          $location.path('/');
      }
    });
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();


