angular.module('starter.controllers')

.controller('AppCtrl', function($scope,AuthService, $ionicConfig) {
			
	AuthService.getinfo().then(function(result){	 
	 	$scope.user=result.User;
	});

})

.controller('ProfileCtrl', function($scope,AuthService) {

})

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: position.coords.latitude, lng: position.coords.longitude};
			$scope.my_location = position.coords.latitude + ", " + position.coords.longitude;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		}, function(err) {
				 // error
				$ionicLoading.hide();
		});
	};
});