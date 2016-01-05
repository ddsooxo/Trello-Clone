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

    // it('should be return an array list', function() {
    //   httpBackend.whenGET("/api/items").respond([]);
    //   var result;
    //   service.getItems('564122f61b4d89a52b92b585')
    //   .then(function(items) {
    //     console.log('did my test run');
    //     result = items;
    //   });

    //   httpBackend.flush();
    //   expect(result).toEqual([]);
    // });
    });
  });
})();