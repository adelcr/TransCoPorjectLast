angular.module('starter.controllers')

.controller('ReclamationCtrl', function ($scope,ReclamationService, $cordovaCamera, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {
  console.log("hsan ReclamationCtrl");
  

$scope.reclamation = {
     name  : '',
     description:  '',
     image: ''

   };
$scope.addreclam = function(files) {
  $scope.reclamation.image=files.base64;

    ReclamationService.addreclamser($scope.reclamation).then(function(msg) {

      var alertPopup = $ionicPopup.alert({
        title: 'Reclamation added success!',
        template: msg
      });
      window.location.reload()
      $state.go('app.reclamation');

    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Reclamation added failed!',
        template: errMsg
      });
    });
  };
	
 
});