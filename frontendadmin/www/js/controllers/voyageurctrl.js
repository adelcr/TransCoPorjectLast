angular.module('starter.controllers')

.controller('VoyageurCtrl',function($scope,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,$ionicPopup,VoyageurService) {

		VoyageurService.getAllVoyageur().then(function(res){
			$scope.voyageur=res;
		});
		
  
		$scope.activate = function(id,index) {
			var confirmPopup = $ionicPopup.confirm({
		       title: 'Confirmer activation',
		       cancelText: 'Annuler',
		       cancelType: 'button-light',
		       template: 'Êtes-vous sûr de vouloir activé le voyageur ?'
		    });
		    confirmPopup.then(function(res) {
		       if(res) {
		        	VoyageurService.activate(id).then(function(result){
		        		$scope.voyageur[index].User.activated=true;
		        	});

		       	}
		    });
		};

		$scope.deactivate = function(id,index) {
			var confirmPopup = $ionicPopup.confirm({
		       title: 'Confirmer deactivation',
		       cancelText: 'Annuler',
		       cancelType: 'button-light',
		       template: 'Êtes-vous sûr de vouloir déactivé le voyageur ?'
		    });
		    confirmPopup.then(function(res) {
		       if(res) {
		        	VoyageurService.deactivate(id).then(function(result){
		        		$scope.voyageur[index].User.activated=false;
		        	});

		        	
		       	}
		    });
		};		
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
});