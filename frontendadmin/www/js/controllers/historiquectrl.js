angular.module('starter.controllers')

.controller('HistoriqueCtrl',function($scope,$ionicPopup,HistoriqueService) {

		HistoriqueService.getAllHistorique().then(function(res){
			$scope.historique=res;
		});
		
  

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

	 $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
});