(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', ['$http','$q', function ($http, $q) {
      var service = {};  

      // create item
      service.register = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/user/register', formData)
           .success(function (data) {
              deferred.resolve(data);
              console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error. Failed to register User: ' + data);
           });
           return deferred.promise;
      };
        
      // //delete item
      // service.removeItem = function (id, listId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/delete/' + id + '?list_id=' + listId)
      //      .success(function (data) {
      //         deferred.resolve(data);
      //          console.log(data);
      //      })
      //      .error(function (data) {
      //         deferred.reject(data);
      //         console.log('Error: ' + data);
      //      });
      //      return deferred.promise;
      // };
        
      // //update item
      // service.editItem = function (id, item_title, listId) {
      //   var deferred = $q.defer();
      //   $http.post('/api/item/edit/' + id + '?item_title=' + item_title + '&list_id=' + listId)
      //      .success(function (data) {
      //          deferred.resolve(data);
      //          console.log(data);
      //      })
      //      .error(function (data) {
      //         deferred.reject(data);
      //         console.log('Error: ' + data);
      //      });
      //      return deferred.promise;
      // };

      return service;
    }]);
})();


// (function () {
//     'use strict';
 
//     angular
//         .module('mytodo')
//         .factory('UserService', UserService);
 
//     UserService.$inject = ['$timeout', '$filter', '$q'];
//     function UserService($timeout, $filter, $q) {
 
//         var service = {};
 
//         service.GetAll = GetAll;
//         service.GetById = GetById;
//         service.GetByUsername = GetByUsername;
//         service.Create = Create;
//         service.Update = Update;
//         service.Delete = Delete;
 
//         return service;
 
//         function GetAll() {
//             var deferred = $q.defer();
//             deferred.resolve(getUsers());
//             return deferred.promise;
//         }
 
//         function GetById(id) {
//             var deferred = $q.defer();
//             var filtered = $filter('filter')(getUsers(), { id: id });
//             var user = filtered.length ? filtered[0] : null;
//             deferred.resolve(user);
//             return deferred.promise;
//         }
 
//         function GetByUsername(username) {
//             var deferred = $q.defer();
//             var filtered = $filter('filter')(getUsers(), { username: username });
//             var user = filtered.length ? filtered[0] : null;
//             deferred.resolve(user);
//             return deferred.promise;
//         }
 
//         function Create(user) {
//             var deferred = $q.defer();
 
//             // simulate api call with $timeout
//             $timeout(function () {
//                 GetByUsername(user.username)
//                     .then(function (duplicateUser) {
//                         if (duplicateUser !== null) {
//                             deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
//                         } else {
//                             var users = getUsers();
 
//                             // assign id
//                             var lastUser = users[users.length - 1] || { id: 0 };
//                             user.id = lastUser.id + 1;
 
//                             // save to local storage
//                             users.push(user);
//                             setUsers(users);
 
//                             deferred.resolve({ success: true });
//                         }
//                     });
//             }, 1000);
 
//             return deferred.promise;
//         }
 
//         function Update(user) {
//             var deferred = $q.defer();
 
//             var users = getUsers();
//             for (var i = 0; i < users.length; i++) {
//                 if (users[i].id === user.id) {
//                     users[i] = user;
//                     break;
//                 }
//             }
//             setUsers(users);
//             deferred.resolve();
 
//             return deferred.promise;
//         }
 
//         function Delete(id) {
//             var deferred = $q.defer();
 
//             var users = getUsers();
//             for (var i = 0; i < users.length; i++) {
//                 var user = users[i];
//                 if (user.id === id) {
//                     users.splice(i, 1);
//                     break;
//                 }
//             }
//             setUsers(users);
//             deferred.resolve();
 
//             return deferred.promise;
//         }
 
//         // private functions
 
//         function getUsers() {
//             if(!localStorage.users){
//                 localStorage.users = JSON.stringify([]);
//             }
 
//             return JSON.parse(localStorage.users);
//         }
 
//         function setUsers(users) {
//             localStorage.users = JSON.stringify(users);
//         }
//     }
// })();
