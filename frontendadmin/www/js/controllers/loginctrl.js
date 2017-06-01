angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})


.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  AuthService.getinfo().then(function(result){
      $scope.user=result.User;
      });
      console.log($scope.user);
 $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('app.maps');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})


.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};
})
