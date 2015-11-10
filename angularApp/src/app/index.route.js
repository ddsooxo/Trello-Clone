(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/items', {
        templateUrl: 'app/item/item.html',
        controller: 'ItemController',
        controllerAs: 'item'
      })
      .otherwise({
        redirectTo: '/lists'
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
