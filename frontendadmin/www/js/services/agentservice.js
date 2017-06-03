angular.module('starter.services')

.service('AgentService', function($q,$http,$timeout,$compile,TransmapFact, API_ENDPOINT) {
var AppService ={
/* 	*/
  addagent:function(user) {
    console.log(user);
 
		var q=$q.defer();
      $http.post(API_ENDPOINT.url + 'agent/add',user).then(function(result) {
        if (result.data.success) {
          q.resolve(result.data.msg);
          
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
  },
  getAllAgent:function() {
    var q=$q.defer();
      $http.get(API_ENDPOINT.url + 'agent/all').then(function(result) {
        if (result.data.agents) {
          q.resolve(result.data.agents);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
  },
  getOneAgent:function(id) {
      var q=$q.defer();
        $http.get(API_ENDPOINT.url + 'agent/get/'+id)
          .then(function(result) {
            if (result.data.success) {
           
                q.resolve(result.data.msg);
            } else {
                q.reject(result.data.msg);
            }
          });
        return q.promise;
  },
  updateAgent:function(id,currentuser) {
    console.log("service agent");
    console.log(id);
      var q=$q.defer();
        $http.put(API_ENDPOINT.url + 'agent/update/'+id,currentuser)
          .then(function(result) {
            if (result.data.agent) {
           
                q.resolve(result.data.agent);
            } else {
                q.reject(result.data.msg);
            }
          });
        return q.promise;
  },
  removeAgent:function(id){
    var q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'agent/remove/'+id)
        .then(function(result) {
          if (result.data.agent) {
              q.resolve(result.data.agent);
          } else {
              q.reject(result.data.msg);
          }
          });
        return q.promise;
  }
}
 return AppService;

});