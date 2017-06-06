angular.module('starter.controllers')

.controller('HistoriqueCtrl',function($scope,$ionicPopup,HistoriqueService) {

		HistoriqueService.getAllHistorique().then(function(res){
			$scope.historique=res;
		});
		
  

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
});