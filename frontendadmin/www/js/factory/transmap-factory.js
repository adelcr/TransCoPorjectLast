angular.module('starter.factories', [])
.factory('TransmapFact', function (){
	var AppFactory ={
		drawMarker:function(marker,$transMap){
			var infowindow = new google.maps.InfoWindow({
	          	content:" <div ng-non-bindable=''><div style='height:100%;float:left;margin-right:10px;'>"+
	          				"<img style='border-radius: 24px;width:64px;height:64px;' src=data:image/jpg;base64,"+marker.image+"></img>"+
            				"</div><div style='width:256px;'>"+
            				"<strong>"+marker.name+"</strong><br>"+
            				"<p>"+marker.description+" </p>"+
            				"</div></div>"
	        });
			$transMap.addMarker({
	            lat:parseFloat(marker.Pos.lat),
	            lng:parseFloat(marker.Pos.lng),
	            id:marker._id,
	            name:marker.name,
	            icon:'img/station-marker.png',
	            draggable: false,
	        	info:infowindow
	        });
		},
		drawMarkerBus:function(marker,$transMap){
			
				/*var infowindow = new google.maps.InfoWindow({
	          	content:" <div ng-non-bindable=''><div style='height:100%;float:left;margin-right:10px;'>"+
	          				"<img style='border-radius: 24px;width:64px;height:64px;' src=data:image/png;base64,"+marker.image+"></img>"+
            				"</div><div style='width:256px;'>"+
            				"<strong>"+marker.name+"</strong><br>"+
            				"<p>"+marker.description+" </p>"+
            				"</div></div>"
	        	});*/
				var infowindow = new google.maps.InfoWindow({
	          	content:" <div ng-non-bindable=''><div style='height:100%;float:left;margin-right:10px;'>"+
	          				"</div><div style='width:256px;'>"+
            				"<strong>"+marker.matricule+"</strong><br>"+
            				"</div></div>"
	        	});
	        	if(marker.Pos){
				$transMap.addMarker({
		            lat:parseFloat(marker.Pos.lat),
		            lng:parseFloat(marker.Pos.lng),
		            id:marker.matricule,
		            name:marker.name,
		            icon:'img/bus-marker.png',
		            draggable: true,
		        	info:infowindow
		        });
			}else{
				$transMap.addMarker({
		            lat:0,
		            lng:0,
		            id:marker._id,
		            name:marker.name,
		            icon:'img/scholar-bus-stop.png',
		            draggable: true,
		        	info:infowindow
		        });
			}	
		},
		addInfoWindowListner:function(marker,$transMap){
			marker.addListener('click', function() {
	            if (isInfoWindowOpen(this.info)) {
	                this.info.close();
	            }else {
	                this.info.open($transMap.gMap, this);
	            }
			});
			marker.info.open($transMap.gMap, marker);
			marker.info.close();
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
		updateMarker:function($id,$scope,$transMap,compiled){
			$transMap.zoom(15);
			var current =$transMap.findBy(function(marker){
	       		return marker.id==$id;
	     	});
			$scope.stationUpdat=current[0].name;
			$scope.found=current;
			$scope.found[0].setIcon("img/busstopred.png");
			
			var infowindow = new google.maps.InfoWindow({
				content:compiled[0]
			});
			 $scope.found[0].info=infowindow;
			$scope.found[0].info.open($transMap, $scope.found[0]);
			$scope.found[0].setDraggable(true);

			google.maps.event.addListener(infowindow,'closeclick',function(){
			infowindow.close();
	     	console.log(current[0].position);
			$scope.found[0].setIcon("img/scholar-bus-stop.png");
			$scope.found[0].setDraggable(false);
			$scope.selectedModif=false;
			var LatLng = new google.maps.LatLng( parseFloat(current[0].lat),parseFloat(current[0].lng));
			$scope.found[0].setPosition(LatLng);
			});
		},
		updatePosBus:function(data,$scope,$transMap){

		  $scope.bus = data;

           angular.forEach($scope.bus,function(bus,index){
             var found =$transMap.findBy(function(marker){
               return marker.id==bus.matricule;
             });
             if (bus.Pos) {
             	     var LatLng = new google.maps.LatLng( parseFloat(bus.Pos.lat),parseFloat(bus.Pos.lng));
            		 found[0].setPosition(LatLng);
           	};
        
        	});
        }
}
return AppFactory;

function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});