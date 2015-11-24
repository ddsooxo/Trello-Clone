(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html'
        // controller: 'HomeController',
        // controllerAs: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $routeProvider
      .when('/items', {
        templateUrl: 'app/item/item.html',
        controller: 'ItemController',
        controllerAs: 'itemCtrl'
      })
      .otherwise({
        redirectTo: '/lists'
      });

    $routeProvider
      .when('/lists', {
        templateUrl: 'app/list/list.html',
        controller: 'ListController',
        controllerAs: 'listCtrl'
      })
      .otherwise({
        redirectTo: '/items'
      });

    $routeProvider
      .when('/boards', {
        templateUrl: 'app/board/board.html',
        controller: 'BoardController',
        controllerAs: 'boardCtrl'
      })
      .otherwise({
        redirectTo: '/lists'
      });

    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $routeProvider
      .when('/register', {
        templateUrl: 'app/register/register.html'
        // controller: 'RegisterController',
        // controllerAs: 'registerCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });


  }

})();
