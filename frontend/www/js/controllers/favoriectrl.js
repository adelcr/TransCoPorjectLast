angular.module('starter.controllers')

.controller('FavorieCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,AuthService,FavorieService,LigneService,StationService) {


$scope.currentnotif= {}
  AuthService.getinfo().then(function(res){
        
        $scope.v=res;
        console.log($scope.v);
        FavorieService.getFavorieByVoyageur($scope.v._id).then(function(result){
          $scope.notif=result;  
          console.log($scope.notif);
          });

        });
$scope.updatefavorie= function (notif) {
         $scope.data = {}
         $scope.idcurrentnotif=notif._id;
         $scope.currentnotif=notif;
         $scope.myPopup = $ionicPopup.show({
         templateUrl: 'views/app/updatefavorie.html',
         title: 'Modifier une notification!',
         cssClass: 'my-custom-popup',
         scope: $scope,
       });
      };
    $scope.submitupdate=function () {
        FavorieService.updateFavorie($scope.idcurrentnotif,$scope.currentnotif).then(function(msg){
              var alertPopup = $ionicPopup.alert({
                  title: 'update notification!',
                  template: msg
                });
              alertPopup.then(function() {
                $scope.myPopup.close();
                    location.reload();
                  });
              });
       };
    $scope.removefavorie = function(id,index) {
      var confirmPopup = $ionicPopup.confirm({
           title: 'Confirmer la suppréssion',
           cancelText: 'Annuler',
           cancelType: 'button-light',
           template: 'Êtes-vous sûr de vouloir supprimé la notification ?'
        });
        confirmPopup.then(function(res) {
           if(res) {
              FavorieService.removeFavorie(id).then(function(result){
                console.log(index);
                delete $scope.notif[index];
              });

              
            }
        });
    };


   
$scope.addFavorie=function (marker) {
      var d="'hh:mm'";
      $scope.doom1={};
      $scope.doom={};
        
          $scope.affecter=false;
          var myPopup = $ionicPopup.show({
          template: '<div ng-if="lignes">'+
               '<select id="searchbar" class="ion-select" ng-model="doom1.selected" ><option value="{{li._id}}" ng-repeat="li in lignes">Nom: {{li.name}}</option> </select>'+
               '</div>'+
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

          FavorieService.addFavorie();
       
  
          
        });
    };
    $scope.searchLigne=function (station) {
        var searchs=document.getElementById("searchS");
          searchs.value="";
          searchs.value=station.name;
          $scope.currentstation=station;
          VoyageService.getLigneByStatsion(station._id).then(function(result){
          $scope.lignes=result;  
          console.log($scope.lignes);
          });
      };

    $scope.selectVoyage = function(ligne) {
          var searchs=document.getElementById("searchS");
          searchs.value="";
          $scope.searchLigne();
          searchs.value=ligne.name;
          $scope.currenetLigne=ligne;
          VoyageService.getVoyageByLigne(ligne._id).then(function(result){
          $scope.voyages=result;  
          console.log($scope.voyages);
          });         
      };

});
        
