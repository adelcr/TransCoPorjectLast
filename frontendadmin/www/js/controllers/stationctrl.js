angular.module('starter.controllers')



.controller('StationCtrl',function($scope, $ionicPopup,StationService,TransmapFact, $state,$cordovaGeolocation,$compile) {
	
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
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

		$scope.addStation = function() {
	      var content="<div  class='list' style='width:300px;overflow:hidden;'>"+
	                              "<div style='border-style:none;'class='item item-input'>"+
	                                "<label class='item-input-wrapper'>"+
	                                  "<input type='text' ng-model='stationSave' placeholder='nom de station'>"+
	                                "</label>"+
	                              "</div>"+
	                              "<div style='border-style:none;'class='item item-input'>"+
	                              "<label class='item-input-wrapper'>"+
	                                 " <input type=file files-input base-sixty-four-input ng-model='files' ngf-max-size='100KB' /><br>"+
	                                 "</label>"+
	                                 "</div>"+
	                                  "<button ng-click='savestat()'class='button button-small'>enregistrer</button"+
	                            "</div>";
	      var compiled = $compile(content)($scope);
	      if (ajout==0) {
	        ajout++;
	        var alertPopup = $ionicPopup.alert({
	          title: 'ajouter une station',
	          template: 'cliquez dans la carte pour ajouter une station'
	        });
	        alertPopup.then(function(res) {
	          google.maps.event.addListener($stationMap.gMap,"click",function(e){
	            TransmapFact.addMarkertmp(e.latLng,$stationMap,compiled,$scope);
	            google.maps.event.clearListeners($stationMap.gMap, 'click');
	          });
	        });
	      }else {
	        google.maps.event.addListener($stationMap.gMap,"click",function(e){
	          TransmapFact.addMarkertmp(e.latLng,$stationMap,compiled,$scope);
	          google.maps.event.clearListeners($stationMap.gMap, 'click');
	        });
	      }
   		};
   		$scope.savestat=function() {
		    if (($scope.stationSave!=null ) && ($scope.stationSave!="")) {
		       StationService.addStation($stationMap,$scope.currentmarker,$scope,$scope.stationSave,$scope.files.base64).then(function(result){
		       	$stationMap.removeBy($scope.currentmarker);
		       	$stationMap.markers.remove($scope.currentmarker);
		       	delete $scope.currentmarker;
		       	delete $scope.stationSave;
		       	delete $scope.files.base64;
		       	TransmapFact.drawMarker(result,$stationMap);
		       	var found =$stationMap.findBy(function(marker){
		                	return marker.id==result._id;
		              	});
		       	TransmapFact.addInfoWindowListner(found[0],$stationMap);
		       	StationService.getAllStation().then(function(result){
					$scope.stations=result;
				});
		       });
		       
		    }
	    }

	    $scope.remove = function(station) {
		    var confirmPopup = $ionicPopup.confirm({
		       title: 'Confirmer suppression',
		       cancelText: 'Annuler',
		       cancelType: 'button-light',
		       template: 'Êtes-vous sûr de vouloir supprimer la station ?'
		    });
		    confirmPopup.then(function(res) {
		       if(res) {
		        	StationService.removeStation($scope,station,$stationMap).then(function(result){
		        		var found =$stationMap.findBy(function(marker){
		                	return marker.id==result._id;
		              	});
			            $stationMap.removeBy(found[0]);
			            $stationMap.markers.remove(found[0]);
			            
			            StationService.getAllStation().then(function(result){
							$scope.stations=result;
						});
		        	});
		       	}
		    });
		};
		  $scope.gotoPosStation=function ($id) {
              $stationMap.zoom(15);
              var found =$stationMap.findBy(function(marker){
                return marker.id==$id;
              });
              $stationMap.gMap.setCenter(found[0].getPosition());
            }
		$scope.selectedModif=false;
		$scope.modifier= function(st) {
			$stationMap.zoom(15);
			$scope.gotoPosStation(st._id);
	    	if($scope.selectedModif==false){
	        	$scope.selectedModif=true;
	        	
	        	var content="<div  class='list' style='height:50px;width:300px;overflow:hidden;'>"+
			                     "<div style='border-style:none;'class='item item-input'>"+
			                       "<label class='item-input-wrapper'>"+
			                         "<input type='text' ng-model='stationUpdat' placeholder='nom de station'>"+
			                       "</label>"+
			                       "<button ng-click='updatstat()'class='button button-small'>enregistrer</button"+
			                     "</div>"+
			                   "</div>";
				var compiled = $compile(content)($scope);
	   			TransmapFact.updateMarker(st._id,$scope,$stationMap,compiled);
	  		}else{
			    var alertPopup = $ionicPopup.alert({
			      title: 'attention',
			      template: 'veuillez terminer la modification en cour'
			    });
	  		}
   		}
   		$scope.updatstat= function(){
			if (($scope.stationUpdat!=null ) && ($scope.stationUpdat!="") ) {
			
	     		console.log($scope.found[0].getPosition().lat());
				$stationMap.removeBy($scope.found[0]);
				$stationMap.markers.remove($scope.found[0]);
				StationService.stationUpdate($scope,$scope.found[0],$stationMap,$scope.stationUpdat).then(function(result){
					TransmapFact.drawMarker(result,$stationMap);
			       	StationService.getAllStation().then(function(result){
						$scope.stations=result;
					});
					var found =$stationMap.findBy(function(marker){
		                	return marker.id==result._id;
		              	});
			       	TransmapFact.addInfoWindowListner(found[0],$stationMap);
				});
				$scope.selectedModif=false;
				console.log($scope.selectedModif);
				delete $scope.found;
				delete $scope.stationUpdat;
			}
   		}
	});
	
});


