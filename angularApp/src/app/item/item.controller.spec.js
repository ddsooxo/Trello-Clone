// (function() {
//   'use strict';

//   describe('ItemController', function(){
//     var $scope, ItemsController

//     //main module
//     beforeEach(module('mytodo'));
    
//     //set up scope and controller to be tested
//     beforeEach(inject(function ($rootScope, $controller) {
//       scope = $rootScope.$new();
//       ItemsController = $controller('ItemsController', {
//         $scope: scope
//       });
//     }));

//     // Define Tests
//     it('should have an empty array of items', function() {
//      expect(scope.items).toEqual([]);
//     });
//   });
// })();

(function() {
  'use strict';

  describe('ItemsController', function() {
    var scope, ItemsController;

    // // Setup the scope and controller to be tested
    // beforeEach(function() {
    //   module('mytodo');
      
    //   inject(function($controller) {
    //     ItemsController = $controller('ItemsController');
    //   });
    // });

    // // Define Tests
    // it('should initialize a todo_list', function() {
    //  expect(ItemsController.todo_list).toEqual([]);
    // });

    // it('should be able to add a Todo item', function() {
    //  ItemsController.todo = { name: 'First Todo' };
    //  ItemsController.addTodo();
    //  expect(ItemsController.todo_list).toEqual(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    // });

    // it ('should be able to remove an item', function() {
    //     var index = 1;
    //     ItemsController.removeTodo(index);
    //     expect(ItemsController.todo_list).toEqual(['Item 1', 'Item 3']);
    // });

    // it ('should be able to mark a Todo complete', function() {
    //     var index = 2;
    //     ItemsController.markTodoComplete(index);
    //     expect(ItemsController.todo_list[2].complete).toEqual(true);
    // });
  });    
})();