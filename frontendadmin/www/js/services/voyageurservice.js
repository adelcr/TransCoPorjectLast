angular.module('starter.services')

.service('VoyageurService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
	var AppService ={
	 	getAllVoyageur:function() {
			var q=$q.defer();
	      $http.get(API_ENDPOINT.url + 'api/allvoyageur').then(function(result) {
	        if (result.data.voyageur) {
	          q.resolve(result.data.voyageur);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
	 	},
		activate:function(id){
		    var q=$q.defer();
		    $http.put(API_ENDPOINT.url + 'api/activate/'+id)
		      .then(function(result) {
		        if (result.data.voyageur) {
		       
		            q.resolve(result.data.voyageur);
		        } else {
		            q.reject(result.data.msg);
		        }
		      });
		    return q.promise;
		  },
		deactivate:function(id){
		    var q=$q.defer();
		    $http.put(API_ENDPOINT.url + 'api/deactivate/'+id)
		      .then(function(result) {
		        if (result.data.voyageur) {
		       
		            q.resolve(result.data.voyageur);
		        } else {
		            q.reject(result.data.msg);
		        }
		      });
		    return q.promise;
		  }
	 
	}
 	return AppService;
});
