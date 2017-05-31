angular.module('starter.controllers')

.controller('BusCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,VoyageService,BusService,LigneService) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $busMap= new transMap(document.getElementById("map"),mapOptions);

		BusService.getAllBus().then(function(result){
			$scope.bus=result;
			var i=0;
			angular.forEach($scope.bus,function(bus,index){
				if(bus.available){
					TransmapFact.drawMarkerBus(bus,$busMap);
				TransmapFact.addInfoWindowListner($busMap.markers.items[i],$busMap);
                i++;
				}
			 	
			});
		});
		LigneService.getAllLigne().then(function(res){
			$scope.ligne=res;
		});
		
		$scope.removeBus=function (bus,index) {
		      var confirmPopup = $ionicPopup.confirm({
		        title: 'Confirmer suppression',
		        cancelText: 'Annuler',
		        cancelType: 'button-light',
		        template: 'Êtes-vous sûr de vouloir supprimer le bus ?'
		      });
		      confirmPopup.then(function(res) {
		        if(res) {
		          BusService.removeBus(bus).then(function(result){
		          		$scope.bus.splice(index,1);
						var found =$busMap.findBy(function(marker){
							return marker.id==b;
						});
						$busMap.removeBy(found[0]);
						$busMap.markers.remove(found[0]);

		          });
		        }
		      });
		    };
		
		$scope.affecter=function (marker) {
			var d="'hh:mm'";
			$scope.doom={};
		    
	        $scope.affecter=false;
	        var myPopup = $ionicPopup.show({
	        template: '<label id="searchbar" class="item item-input ion-android-search" >'+
               '<input type="text" style="padding-left:10px;" placeholder="selectionnez une ligne" id="searchS" ng-keyUp="searchStat()">'+
               '</label>'+
               '<ion-list id="searchRes"></ion-list>'+
               '<div ng-if="voyages">'+
               '<select id="searchbar" class="ion-select" ng-model="doom.selected" ><option value="{{vo._id}}" ng-repeat="vo in voyages">Heur depart: {{vo.dateDepart| date:'+d+'}}</option> </select>'+
               '</div>',
	        title: 'Entrer la ligne',
	        scope: $scope,
	        
	        buttons: [
	          { text: 'Annuler' },
	          {
	            text: '<b>valid ligne</b>',
	            type: 'button-positive'
	          }
	        ]
	      });
	      myPopup.then(function(res) {

	        BusService.affecterVoyage(marker._id,$scope.doom.selected);
	     
	
	        
	      });
		};
		
		

		$scope.selectLigne = function(ligne) {
	      	var searchs=document.getElementById("searchS");
        	searchs.value="";
        	$scope.searchStat();
        	searchs.value=ligne.name;
	        $scope.currenetLigne=ligne;
	        VoyageService.getVoyageByLigne(ligne._id).then(function(result){
	        $scope.voyages=result;	
	        console.log($scope.voyages);
	        });	        
	    };

		$scope.searchStat=function () {
	      var searchs=document.getElementById("searchS");
	      $scope.searchs=searchs.value;
	      if (($scope.searchs=="")&&($scope.testRes)) {
	      		if($scope.currenetLigne){
	      			delete $scope.currenetLigne;
	      			delete $scope.voyages;
	      		}
	          var searchbar=document.getElementById("searchRes");
	          var content='<ion-list  id="searchRes"></ion-list>';
	          var compiled = $compile(content)($scope);
	          searchbar.replaceWith(compiled[0]);
	          $scope.testRes=false;
	      }
	      if (searchs.value!="") {
	        if (!$scope.testRes) {
	          var searchbar=document.getElementById("searchbar");
	          var content='<ion-list id="searchRes"><ion-item class="searchResli" ng-repeat="li in ligne |filter: {name:searchs}" ng-click="selectLigne(li)">{{li.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var searchRes=document.getElementById("searchRes");
	        searchRes.replaceWith(compiled[0]);
	        $scope.testRes=true;
	        }
	        else{
	          var content='<ion-list id="searchRes"><ion-item class="searchResli" ng-repeat="li in ligne |filter:{name: searchs}" ng-click="selectLigne(li)">{{li.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var se=document.getElementById("searchRes");
	        se.replaceWith(compiled[0]);
	        }
	        }
	    };

	    $scope.addBus=function () {
	      $scope.data = {};
	        $scope.enregistrer=false;
	        var myPopup = $ionicPopup.show({
	        template: '<label class="item item-input"><input type="number" placeholder="numero immatricule.." ng-model="data.matricule"></label>',
	        title: 'entre le numéro immatricule du bus',
	        scope: $scope,
	        buttons: [
	          { text: 'Annuler' },
	          {
	            text: '<b>enregistrer</b>',
	            type: 'button-positive',
	            onTap: function(e) {
	              if (!$scope.data.matricule) {
	                e.preventDefault();
	              }else {
	                $scope.enregistrer=true;
	              }
	            }
	          }
	        ]
	      });
	      myPopup.then(function(res) {
	        if ($scope.enregistrer) {
	          BusService.addBus($scope,$scope.data.matricule).then(function(result){
	          	$scope.bus.push(result);
	          	TransmapFact.drawMarkerBus(result,$busMap);
	     
	          });
	        }
	      });
	    }
	    function updateBus($scope,$busMap){
	    	BusService.updatePosBus($scope,$busMap);
	    
	    	return $timeout(function() { // boucle
	    		
          		return updateBus($scope,$busMap);
        	},500);
	    }
		updateBus($scope,$busMap);
			
	});
});