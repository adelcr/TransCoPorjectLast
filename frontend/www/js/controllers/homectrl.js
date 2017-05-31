angular.module('starter.controllers')

.controller('AppCtrl', function($scope,AuthService, $ionicConfig, $state) {
	console.log("AppCtrl");
	
	$scope.isAuth=false;
	$scope.isAuth=AuthService.isAuthenticated;
		
		if($scope.isAuth==true)	{
			AuthService.getinfo().then(function(result){
	 		$scope.user=result;
			});

			$scope.logout = function() {
			    AuthService.logout();
				window.location.reload();
		 		$state.go('app.station');
		 	};
	 	}else{
	 		console.log(AuthService.isAuthenticated);
	 	}
})

.controller('ProfileCtrl', function($http,$scope,$ionicPopup,AuthService,ProfileService, $state,$window) {
	 console.log("ProfileCtrl");
	 $scope.isAuth=false;
	$scope.isAuth=AuthService.isAuthenticated;
		
		if($scope.isAuth==true)	{
		
			AuthService.getinfo().then(function(result){
		 		$scope.voyageur=result;
		 	});
	 	}else{

	 		window.location.reload();
		 	$state.go('app.login');
	 	}
 
$scope.voyageur = {
		User:{
			email: '',
			name: '',
			lastname: '',
			adress: '',
			phone: '',
			image: '',
			login: ''
			}
	  
	};


$scope.profile = function(files) {


	$scope.voyageur.User.image=files.base64;

    ProfileService.profile($scope.voyageur).then(function(msg) {

      var alertPopup = $ionicPopup.alert({
        title: 'Update success!',
        template: msg
      });
      	window.location.reload();
		$state.go('app.profile');

    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'update failed!',
        template: errMsg
      });
    });
  };

});