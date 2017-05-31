angular.module('starter.services')

.service('LigneService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
	var AppServiceLigne ={
	 	getAllLigne:function() {
			var q=$q.defer();
	      $http.get(API_ENDPOINT.url + 'ligne/all').then(function(result) {
	        if (result.data.lignes) {
	          q.resolve(result.data.lignes);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
	 	}


	}
 	return AppServiceLigne;
});
