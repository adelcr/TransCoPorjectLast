angular.module('starter.controllers')

.controller('comptepayCtrl', function($scope, $ionicConfig, ComptesPayService, $window,$http) {
	var url = "https://httpbin.org/post";
	var vm=$scope;
	$scope.numberOfItemsToDisplay = 6;
	$scope.comptespay=[];
	$scope.hasFilters= false;
	ComptesPayService.getallaccounts().then(function(result){
			console.log(result);
			$scope.comptespay=result;
			}); 
	$scope.LoadMoreContent = function() {
			
        if ($scope.comptespay.length >$scope.numberOfItemsToDisplay)
         { 
         	$scope.numberOfItemsToDisplay += 3; // load 5 more items
        	// need to call this when finish loading more data 
		  }
		$scope.$broadcast('scroll.infiniteScrollComplete');
		};
	$scope.openFilters=function(hasFilters){
		$scope.hasFilters= !$scope.hasFilters;
	};
	vm.upload = function(files) {
    console.log(files);
    //var formData = new $window.FormData();
    //formData.append("file-0", vm.files[0]);
    
    // $http.post(url, files[0])
    //  .then(function(response) {
    //   vm.result = "SUCCESS";
    //   vm.data = response.data.data;
    // }).catch(function(response) {
    //   vm.result = "ERROR "+response.status;
    // });
  };
});
