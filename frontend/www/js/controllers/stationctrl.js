angular.module('starter.controllers')



.controller('StationCtrl',function($scope, $ionicPopup,StationService,TransmapFact, $state,$cordovaGeolocation,$compile) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $stationMap= new transMap(document.getElementById("map"),mapOptions);
		
		StationService.getAllStation().then(function(result){
			$scope.stations=result;
			var marker;
			var i=0;
			angular.forEach($scope.stations,function(station,index){
			 	TransmapFact.drawMarker(station,$stationMap);
				TransmapFact.addInfoWindowListner($stationMap.markers.items[i],$stationMap);
                i++;
			});
		});	
			
})

function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});