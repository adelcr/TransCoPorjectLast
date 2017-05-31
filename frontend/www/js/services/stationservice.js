angular.module('starter.services')

.service('StationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

var AppService ={
 	getAllStation:function() {
		q=$q.defer();
      $http.get(API_ENDPOINT.url + 'station/allst').then(function(result) {
        if (result.data.stations) {
          q.resolve(result.data.stations);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	}
 }
 return AppService;

});