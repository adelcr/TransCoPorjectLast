angular.module('starter.services')

.service('NotificationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

var AppService ={

 	getNotificationByVoyageur:function(id) {
		q=$q.defer();
      $http.get(API_ENDPOINT.url + 'notification/getbyvoyageur/'+id).then(function(result) {
        if (result.data.notifications) {
          q.resolve(result.data.notifications);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
  removeNotification:function(id){
    var q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'notification/remove/'+id)
        .then(function(result) {
          if (result.data.notification) {
              q.resolve(result.data.notification);
          } else {
              q.reject(result.data.msg);
          }
          });
        return q.promise;
  }
 }
 return AppService;

});