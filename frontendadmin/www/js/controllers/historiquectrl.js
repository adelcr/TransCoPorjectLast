angular.module('starter.controllers')

.controller('HistoriqueCtrl',function($scope,$ionicPopup,HistoriqueService,$filter) {
	$scope.ligne=[];
	$scope.voyage=[];
	var historiques=[];
	$scope.days = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
	$scope.series = ['moyenne des retards'];
	$scope.data = [];
	var retard=[];
	$scope.selectedLigne = null;
	$scope.selectedVoyage = null;
	HistoriqueService.getAllHistorique().then(function(res){
		$scope.historique=res;
		angular.forEach($scope.historique,function(historique,index){
			var existe=$scope.ligne.indexOf(historique.ligne.name);
			if (existe==-1) {
				$scope.ligne.push(historique.ligne.name);
			};
		});
	});

	$scope.getVoyage=function(newValue){
		angular.forEach($scope.historique,function(historique,index){
			var date=$filter('date')(historique.voyage.dateDepart, "HH:mm");
			var existe=$scope.voyage.indexOf(date);
			if (existe==-1 && historique.ligne.name==newValue) {
				$scope.voyage.push(date);
			};
		});
	}
	$scope.addStat=function(){
	
	}
	$scope.removeStat=function(value){
	$scope.data.splice(0,1);
	delete $scope.selectedLigne;
	delete $scope.selectedVoyage;
	}
	$scope.setChart=function(voyage){
		for (var i = 0; i < $scope.days.length; i++) {
			var nbJour=0;
			var estimRetard=0;
			angular.forEach($scope.historique,function(historique,index){
				var date=$filter('date')(historique.voyage.dateDepart, "HH:mm");
				if (voyage==date) {

					historiques.push(historique);
					if (historique.jour==i) {
						var dateArrive= new Date(historique.dateArriver);
						var dateEstim= new Date(historique.dateEstimer);
						var minuteEstim= dateEstim.getHours()*60 + dateEstim.getMinutes();
						var minuteArr= dateArrive.getHours()*60 + dateArrive.getMinutes();
						
						estimRetard=estimRetard+(minuteArr-minuteEstim);
						nbJour++;
					};
				};
			});
			if (estimRetard!=0) {
			estimRetard=estimRetard/nbJour;
			retard[i]=Math.round(estimRetard);
			}else{
				retard[i]=0;
			};
			
		};
		$scope.data.push(retard);
	}
	function getDays(jour){
		return(days[jour]);
	}
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}


});