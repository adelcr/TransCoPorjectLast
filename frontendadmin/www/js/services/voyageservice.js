angular.module('starter.services')

.service('VoyageService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
var AppService ={
 	getVoyageByLigne:function(ligne) {
		var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'voyage/getbyligne/'+ligne).then(function(result) {
        if (result.data.voyages) {
          q.resolve(result.data.voyages);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
  addVoyage:function(ligne,dateDepart,duree,dateArriver) {
    var q=$q.defer();
    console.log(dateDepart);
                console.log(dateArriver);
    var data = {
            ligne: ligne,
            dateDepart: dateDepart,
            dateArriver: dateArriver,
            duree:duree
        };
      $http.post(API_ENDPOINT.url + 'voyage/add',data).then(function(result) {
        if (result.data.voyage) {
          q.resolve(result.data.voyage);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
  }
 
}
 return AppService;

});