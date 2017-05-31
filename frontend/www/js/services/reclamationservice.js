angular.module('starter.services')

.service('ReclamationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

 console.log("ProfileService");

 var addreclamser = function(reclamation) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'reclamation/addrec',reclamation).then(function(result) {
        if (result.data.sucess) {
          resolve(result.data.msg);
          console.log(result.data)
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  return {
    addreclamser: addreclamser
   
  };

});