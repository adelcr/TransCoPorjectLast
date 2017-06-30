angular.module('starter.factories', [])
.factory('TransmapFact', function (){
	var AppFactory ={
		drawMarker:function(marker,$transMap){

	          console.log(marker);
			var infowindow = new google.maps.InfoWindow({
	          	content:" <div ng-non-bindable=''><div style='height:100%;float:left;margin-right:10px;'>"+
	          				"<img style='border-radius: 24px;width:64px;height:64px;' src=data:image/png;base64,"+marker.image+"></img>"+
            				"</div><div style='width:256px;'>"+
            				"<strong>"+marker.name+"</strong><br>"+
            				"<a ng-click='addFavorie(marker)'>Ajouter aux favorie </a>"+
            				"<p>"+marker.description+" </p>"+
            				
            				"</div></div>"
	        });
			$transMap.addMarker({
	            lat:parseFloat(marker.Pos.lat),
	            lng:parseFloat(marker.Pos.lng),
	            id:marker._id,
	            name:marker.name,
	            icon:'img/scholar-bus-stop.png',
	            draggable: false,
	        	info:infowindow
	        });
		},
		addInfoWindowListner:function(marker,$transMap){
			marker.addListener('click', function() {
	            if (isInfoWindowOpen(this.info)) {
	                this.info.close();
	            }else {
	                this.info.open($transMap.gMap, this);
	            }
			});
		},
		addMarkertmp:function(latLng,$transMap,compiled,$scope){
			$scope.currentmarker=$transMap.addMarker({
		        lat:parseFloat(latLng.lat()),
		        lng:parseFloat(latLng.lng()),
		        icon:'img/busstopred.png',
		        draggable: false
		    });
	        var infowindow = new google.maps.InfoWindow();
	        infowindow.setContent(compiled[0]);
	        google.maps.event.trigger($scope.currentmarker, 'click');
	        infowindow.open($transMap, $scope.currentmarker);
	        
	        google.maps.event.addListener(infowindow,'closeclick',function(){
	        	$transMap.removeBy($scope.currentmarker);
	        });
		},
		drawLigne1:function(tabDraw,foot,$scope){
			
			tabDraw.forEach(function(draw){
				waypts=[];

      				

				if(res.foot==true){
					var request = {
				        origin: new google.maps.LatLng(draw.stations[0].station.Pos.lat,draw.stations[0].station.Pos.lng),
				        destination: new google.maps.LatLng(draw.stations[1].station.Pos.lat,draw.stations[1].station.Pos.lng),
				        travelMode: google.maps.DirectionsTravelMode.WALKING ,
				        unitSystem: google.maps.DirectionsUnitSystem.METRIC
		      			};
		      			$scope.directionService.route(request,function(response,status){
				        if (status == google.maps.DirectionsStatus.OK) {
				          $scope.directionDisplay.setDirections(response);
				          console.log(response);
				          $scope.directionDisplay.setOptions({
				            polylineOptions:{
				            				strokeColor: '#00bbff',
							            	strokeOpacity: 1.0,
			          						strokeWeight: 6
			          						},
				            suppressMarkers: true,
				            preserveViewport:true
				          });
				        }
				      });

				} else{
					for (var i = 0; i <draw.stations.length ; i++) {
      					var stop = new google.maps.LatLng(draw.stations[i].station.Pos.lat,draw.stations[i].station.Pos.lng);
      					waypts.push({
      						location: stop,
                          	stopover: true
      					});
      				}
					var request = {
				        origin: new google.maps.LatLng(draw.stations[0].station.Pos.lat,draw.stations[0].station.Pos.lng),
				        destination: new google.maps.LatLng(draw.stations[draw.stations.length-1].station.Pos.lat,draw.stations[draw.stations.length-1].station.Pos.lng),
				        waypoints:waypts,
				        travelMode: google.maps.DirectionsTravelMode.DRIVING,
				        unitSystem: google.maps.DirectionsUnitSystem.METRIC
		      			}
		      			$scope.directionService.route(request,function(response,status){
				        if (status == google.maps.DirectionsStatus.OK) {
				          $scope.directionDisplay.setDirections(response);
				          console.log(response);
				          $scope.directionDisplay.setOptions({
				            polylineOptions:{
				            				strokeColor: '#fffff',
							            	strokeOpacity: 1.0,
			          						strokeWeight: 6
			          						},
				            suppressMarkers: true,
				            preserveViewport:true
				          });
				        }
				      });


				}

			});

		      		

		},
		drawLignenew:function(stations,originIndex,destinationIndex,$scope){

			waypts=[];

      				for (var i = originIndex+1; i <destinationIndex ; i++) {
      					var stop = new google.maps.LatLng(stations[i].station.Pos.lat,stations[i].station.Pos.lng);
      					waypts.push({
      						location: stop,
                          	stopover: true
      					});
      				}
      				
      				
      				var request = {
				        origin: new google.maps.LatLng(stations[originIndex].station.Pos.lat,stations[originIndex].station.Pos.lng),
				        destination: new google.maps.LatLng(stations[destinationIndex].station.Pos.lat,stations[destinationIndex].station.Pos.lng),
				        waypoints:waypts,
				        travelMode: google.maps.DirectionsTravelMode.DRIVING,
				        unitSystem: google.maps.DirectionsUnitSystem.METRIC
		      			};

		      		//$scope.gotoPosStation(currentligne.stations[originIndex].station._id);
		      		$scope.gotoPosStation(stations[destinationIndex].station._id);

		      		$scope.directionService.route(request,function(response,status){
				        if (status == google.maps.DirectionsStatus.OK) {
				          $scope.directionDisplay.setDirections(response);
				          console.log(response);
				          $scope.directionDisplay.setOptions({
				            polylineOptions:{
				            				strokeColor: '#00bbff',
							            	strokeOpacity: 1.0,
			          						strokeWeight: 6
			          						},
				            suppressMarkers: true,
				            preserveViewport:true
				          });
				        }
				      });	

		},
		drawLigne:function(stations,originIndex,destinationIndex,$scope){

			waypts=[];

      				for (var i = originIndex+1; i <destinationIndex ; i++) {
      					var stop = new google.maps.LatLng(stations[i].station.Pos.lat,stations[i].station.Pos.lng);
      					waypts.push({
      						location: stop,
                          	stopover: true
      					});
      				}
      				
      				
      				var request = {
				        origin: new google.maps.LatLng(stations[originIndex].station.Pos.lat,stations[originIndex].station.Pos.lng),
				        destination: new google.maps.LatLng(stations[destinationIndex].station.Pos.lat,stations[destinationIndex].station.Pos.lng),
				        waypoints:waypts,
				        travelMode: google.maps.DirectionsTravelMode.DRIVING,
				        unitSystem: google.maps.DirectionsUnitSystem.METRIC
		      			};

		      		//$scope.gotoPosStation(currentligne.stations[originIndex].station._id);
		      		$scope.gotoPosStation(stations[destinationIndex-1].station._id);

		      		$scope.directionService.route(request,function(response,status){
				        if (status == google.maps.DirectionsStatus.OK) {
				          $scope.directionDisplay.setDirections(response);
				          console.log(response);
				          $scope.directionDisplay.setOptions({
				            polylineOptions:{
				            				strokeColor: '#00bbff',
							            	strokeOpacity: 1.0,
			          						strokeWeight: 6
			          						},
				            suppressMarkers: true,
				            preserveViewport:true
				          });
				        }
				      });	

		}
}
return AppFactory;

function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});