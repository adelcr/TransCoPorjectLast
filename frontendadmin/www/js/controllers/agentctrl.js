angular.module('starter.controllers')

.controller('AgentCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,AgentService) {
		$scope.adduser = {};
		$scope.currentagent= {}
		AgentService.getAllAgent().then(function(res){
			$scope.agent=res;
		});
		$scope.addagent= function () {
		  	 $scope.data = {}
			 $scope.data.exists=false;
		  	 $scope.myPopup = $ionicPopup.show({
		     templateUrl: 'views/app/gestionnaire_admin/addagent.html',
		     title: 'Ajouter un compte!',
		     cssClass: 'my-custom-popup',
		     scope: $scope,
		   });
		  };
		$scope.submit=function () {
			console.log($scope.adduser);
		   	AgentService.addagent($scope.adduser).then(function(msg){
							var alertPopup = $ionicPopup.alert({
					        title: 'ajouter nouvel utilisateur!',
					        template: msg
					      });
							alertPopup.then(function() {
								$scope.myPopup.close();
					          location.reload();
					        });
					    });
		   };
		   $scope.updateagent= function (useragent) {
		  	 $scope.data = {}
		  	 $scope.idcurrentagent=useragent._id;
		  	 $scope.currentagent=useragent;
			 $scope.data.exists=false;
		  	 $scope.myPopup = $ionicPopup.show({
		     templateUrl: 'views/app/gestionnaire_admin/updateagent.html',
		     title: 'Modifier un compte!',
		     cssClass: 'my-custom-popup',
		     scope: $scope,
		   });
		  };
		$scope.submitupdate=function () {
			$scope.currentagent.User.role="agent_role";
		   	AgentService.updateAgent($scope.idcurrentagent,$scope.currentagent).then(function(msg){
							var alertPopup = $ionicPopup.alert({
					        title: 'update nouvel utilisateur!',
					        template: msg
					      });
							alertPopup.then(function() {
								$scope.myPopup.close();
					          location.reload();
					        });
					    });
		   };
		$scope.removeAgent = function(id,index) {
			var confirmPopup = $ionicPopup.confirm({
		       title: 'Confirmer la suppréssion',
		       cancelText: 'Annuler',
		       cancelType: 'button-light',
		       template: 'Êtes-vous sûr de vouloir supprimé l"agent ?'
		    });
		    confirmPopup.then(function(res) {
		       if(res) {
		        	AgentService.removeAgent(id).then(function(result){
		        		console.log(index);
		        		delete $scope.agent[index];
		        	});

		        	
		       	}
		    });
		};


});