angular.module('starter.services')

.service('FavorieService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

var AppService ={
 	addFavorie:function() {
		q=$q.defer();
      $http.post(API_ENDPOINT.url + 'favorie/add').then(function(result) {
        if (result.data.favories) {
          q.resolve(result.data.favories);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
 	getFavorieByVoyageur:function(id) {
		q=$q.defer();
      $http.get(API_ENDPOINT.url + 'favorie/getbyvoyageur/'+id).then(function(result) {
      	console.log(result);
        if (result.data.favories) {
          q.resolve(result.data.favories);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
  updateFavorie:function(id,favorieCurrent) {
    console.log(id);
      var q=$q.defer();
        $http.put(API_ENDPOINT.url + 'favorie/update/'+id,favorieCurrent)
          .then(function(result) {
            if (result.data.favorie) {
           
                q.resolve(result.data.favorie);
            } else {
                q.reject(result.data.msg);
            }
          });
        return q.promise;
  },
  removeFavorie:function(id){
    var q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'favorie/remove/'+id)
        .then(function(result) {
          if (result.data.favorie) {
              q.resolve(result.data.favorie);
          } else {
              q.reject(result.data.msg);
          }
          });
        return q.promise;
  }
 }
 return AppService;

});