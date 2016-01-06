(function() {
  'use strict';

  describe('ItemService', function() {
    var service, httpBackend;

    // Configure module that contains the controller being tested
    beforeEach(module('mytodo'));

    beforeEach(inject(function (_ItemService_, $httpBackend) {
      service = _ItemService_;
      httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should be return an array list', function() {
      httpBackend.whenGET("/api/items").respond([]);
    });
  });
})();