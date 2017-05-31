angular.module('starter.controllers')

.controller('MapCtrl',function($scope,$timeout,$sce,$state,$filter,$cordovaGeolocation,TransmapFact,StationService,BusService,LigneService) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $Map= new transMap(document.getElementById("map"),mapOptions);
		var i=0;
		BusService.getAllBus().then(function(result){
			$scope.bus=result;
			
			angular.forEach($scope.bus,function(bus,index){
			 	TransmapFact.drawMarkerBus(bus,$Map);
				TransmapFact.addInfoWindowListner($Map.markers.items[i],$Map);
                i++;
			});
		});
		LigneService.getAllLigne().then(function(res){
			$scope.ligne=res;
		});
		StationService.getAllStation().then(function(result){
			$scope.stations=result;
			var marker;
			angular.forEach($scope.stations,function(station,index){
			 	TransmapFact.drawMarker(station,$Map);
				TransmapFact.addInfoWindowListner($Map.markers.items[i],$Map);
                i++;
			});
		});	

			
	});
});