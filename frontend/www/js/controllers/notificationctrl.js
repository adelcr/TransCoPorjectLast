angular.module('starter.controllers')

.controller('NotificationCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,NotificationService,AuthService) {


		AuthService.getinfo().then(function(res){
        
	        $scope.v=res;
	        NotificationService.getNotificationByVoyageur($scope.v._id).then(function(result){
				$scope.notification=result;
				$scope.number=$scope.notification.length;
				console.log($scope.notification);
				
			});

        });

		


	   /* function updateBus($scope,$busMap){
	    	BusService.updatePosBus($scope,$busMap);
	    
	    	return $timeout(function() { // boucle
	    		
          		return updateBus($scope,$busMap);
        	},500);
	    }
		updateBus($scope,$busMap);*/
			

});