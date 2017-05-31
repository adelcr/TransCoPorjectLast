angular.module('starter.services')

.service('StationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
var AppService ={
 	getAllStation:function() {
		var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'station/allst').then(function(result) {
        if (result.data.stations) {
          q.resolve(result.data.stations);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
 	removeStation:function($scope,marker,$transMap){
 		var q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'station/removest/'+marker._id)
        .then(function(result) {
        	if (result.data.station) {
          		q.resolve(result.data.station);
        	} else {
          		q.reject(result.data.msg);
        	}
          });
        return q.promise;
  },
  stationUpdate:function($scope,marker,$transMap,stationName){
    var q=$q.defer();
    var data = {
            name: stationName,
            lat: marker.getPosition().lat(),
            lng:marker.getPosition().lng()
        };
   $transMap.removeBy(marker);
    $http.put(API_ENDPOINT.url + 'station/updatst/'+marker.id,data)
      .then(function(result) {
        if (result.data.station) {
       
            q.resolve(result.data.station);
        } else {
            q.reject(result.data.msg);
        }
      });
    return q.promise;
  },
  addStation:function($transMap,marker,$scope,stationName,stationImage) {
  	if (marker) {
		var q=$q.defer();
		var data = {
            name: stationName,
            image:stationImage,
            lat: marker.lat,
            lng:marker.lng
        };
        
      $http.post(API_ENDPOINT.url + 'station/addst',data).then(function(result) {
        if (result.data.msg) {
          q.resolve(result.data.station);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
    };
  }
}
 return AppService;

});