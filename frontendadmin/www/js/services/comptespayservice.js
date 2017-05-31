angular.module('starter.services')

.service('ComptesPayService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

	var getallaccounts=function(){
			return $q(function(resolve, reject) {
		      $http.get(API_ENDPOINT.url + 'paiement/allaccounts').then(function(result) {
		        if (result.data.success) {
		          resolve(result.data.comptepaiement);
		        } else {
		          reject(result.data.msg);
		        }
		      });
		    });
		}
	
	return {
		getallaccounts: getallaccounts
	};

});