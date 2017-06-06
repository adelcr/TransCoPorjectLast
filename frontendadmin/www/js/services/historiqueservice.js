angular.module('starter.services')

.service('HistoriqueService', function($q,$http, API_ENDPOINT) {
var AppService ={
/* 	*/

  getAllHistorique:function() {
    var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'historique/all').then(function(result) {
        if (result.data.historiques) {
          q.resolve(result.data.historiques);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
  }
}
 return AppService;

});