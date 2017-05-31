angular.module('starter.services')

.service('ProfileService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

 console.log("ProfileService");

 var profile = function(voyageur) {
/*  console.log("in ser");
  console.log(user);
  console.log("in ser");*/


    return $q(function(resolve, reject) {
      $http.put(API_ENDPOINT.url + 'api/updatprofile/'+ voyageur._id,voyageur).then(function(result) {
        if (result.data.newVoyageur) {
          resolve(result.data.newVoyageur);
           console.log("in ser");
          console.log(result.data.newVoyageur);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  return {
    profile: profile
   
  };

});