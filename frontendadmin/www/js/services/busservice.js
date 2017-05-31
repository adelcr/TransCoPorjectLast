angular.module('starter.services')

.service('BusService', function($q,$http,$timeout,$compile,TransmapFact, API_ENDPOINT) {
var AppService ={
 	getAllBus:function() {
		var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'bus/all').then(function(result) {
        if (result.data.buss) {
          q.resolve(result.data.buss);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
  updatePosBus:function($scope,$transMap) {
    var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'bus/all').then(function(result) {
        if (result.data.buss) {
           TransmapFact.updatePosBus(result.data.buss,$scope,$transMap)
          q.resolve(result.data.buss);
        } else {
          q.reject(result.data.msg);
        }
        return q.promise;
      });
  },
 	removeBus:function(marker){
 		var q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'bus/remove/'+marker._id)
        .then(function(result) {
        	if (result.data.bus) {
          		q.resolve(result.data.bus);
        	} else {
          		q.reject(result.data.msg);
        	}
          });
        return q.promise;
  },
  affecterVoyage:function(marker,voyage){
    var q=$q.defer();
    console.log(voyage);
    var data = {
            voyage : voyage
        };
console.log(data);
    $http.put(API_ENDPOINT.url + 'bus/update/'+marker,data)
      .then(function(result) {
        if (result.data.bus) {
       
            q.resolve(result.data.bus);
        } else {
            q.reject(result.data.msg);
        }
      });
    return q.promise;
  },
  addBus:function($scope,matricule) {
 
		var q=$q.defer();
		var data = {
            matricule: matricule
        };
        
      $http.post(API_ENDPOINT.url + 'bus/add',data).then(function(result) {
        if (result.data.msg) {
          q.resolve(result.data.bus);
          
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
  }
}
 return AppService;

});