angular.module('starter.controllers')

.controller('VoyageurCtrl',function($scope,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,$ionicPopup,VoyageurService) {
	var DEFAULT_PAGE_SIZE_STEP = 2;
	 $scope.currentPage = 1;
  	 $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
  	 $scope.nbPage=0;
  	 $scope.vovo=[];
		VoyageurService.getAllVoyageur().then(function(res){
			$scope.voyageur=res;
			$scope.nbPage= $scope.voyageur.length/DEFAULT_PAGE_SIZE_STEP;
			console.log($scope.nbPage);
			for (var i = 0; i < DEFAULT_PAGE_SIZE_STEP; i++) {
  	 			$scope.vovo[i]=$scope.voyageur[i];
  	 		};
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
	$scope.loadNextPage = function(){
		$scope.vovo=[];
		j=0;
    $scope.pageSize = $scope.currentPage + DEFAULT_PAGE_SIZE_STEP;
    for (var i = $scope.pageSize; i < $scope.pageSize+DEFAULT_PAGE_SIZE_STEP; i++) {
    	console.log(i);	
    	if ($scope.voyageur[i]!=null) {
  	 		$scope.vovo[j]=$scope.voyageur[i];
  	 		 j++;
    	};
 
  	};

  }
});