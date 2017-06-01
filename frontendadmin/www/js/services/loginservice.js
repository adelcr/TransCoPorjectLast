angular.module('starter.services', [])

.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;
  var role = '';
  function loadUserCredentials() {

    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {

    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
    console.log(isAuthenticated);
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    role='';
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'admin/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'admin/authenticateadmin', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var getinfo = function() {
    
    return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + 'admin/memberinfoadmin', window.localStorage.getItem(LOCAL_TOKEN_KEY)).then(function(result) {
        if (result.data.success) {
          resolve(result.data.admin);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
  
  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthorized: isAuthorized,
    getinfo: getinfo,
    isAuthenticated: function() {return isAuthenticated;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})


.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});