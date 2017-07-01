angular.module('starter.controllers')

.controller('AppCtrl', function($scope,$ionicPopover,AuthService, $ionicConfig, $state,NotificationService) {
	console.log("AppCtrl");
	
	$scope.isAuth=false;
	$scope.isAuth=AuthService.isAuthenticated;
		
		if($scope.isAuth==true)	{
			AuthService.getinfo().then(function(result){
	 		$scope.user=result;
	 		console.log($scope.user._id);
			});

			$scope.logout = function() {
			    AuthService.logout();
				window.location.reload();
		 		$state.go('app.station');
		 	};
	 	}else{
	 		console.log(AuthService.isAuthenticated);
	 	}

	 	AuthService.getinfo().then(function(res){
        
	        $scope.v=res;
	        NotificationService.getNotificationByVoyageur($scope.v._id).then(function(result){
				$scope.notification=result;
				$scope.number=$scope.notification.length;
				console.log($scope.notification);
				
			});

        });
       $scope.removenotification = function(id,index) {
      
       
              NotificationService.removeNotification(id).then(function(result){
                console.log(index);
                delete $scope.notification[index];
              });


    };
	 	  $ionicPopover.fromTemplateUrl('views/app/side-menu.html', {
			    scope: $scope,
			  }).then(function(popover) {
			    $scope.popover = popover;
			  });
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