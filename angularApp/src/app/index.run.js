(function() {
  'use strict';

  angular
    .module('mytodo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
