(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/item/item.html',
        controller: 'ItemController',
        controllerAs: 'item'
      })
      .otherwise({
        redirectTo: '/'
      });

    $routeProvider
      .when('/lists', {
        templateUrl: 'app/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/items'
      });
  }

})();
