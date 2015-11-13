// (function() {
//   'use strict';

//   describe('ListService', function() {
//     var service;

//     // Configure module that contains the controller being tested
//     beforeEach(module('mytodo'));

//     beforeEach(inject(function (_ListService_) {
//       service = _ListService_;
//     }));

//     it('should be 0', function() {
//       expect(service.getList()).toEqual(0);
//     });

//     it('should set current list to 1', function() {
//       expect(service.setList(1)).toEqual(1);
//       expect(service.getList()).toEqual(1);
//     });
//   });
// })();