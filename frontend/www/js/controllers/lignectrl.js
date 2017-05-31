angular.module('starter.controllers')

.controller('LigneCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,LigneService,StationService) {

  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions=optionInt(myPos);
    var $Map= new transMap(document.getElementById("map"),mapOptions);
 console.log($Map);
      StationService.getAllStation().then(function(result){
        $scope.stations=result;
        var i=0;
        angular.forEach($scope.stations,function(station,index){
          TransmapFact.drawMarker(station,$Map);
          TransmapFact.addInfoWindowListner($Map.markers.items[i],$Map);
                  i++;
        });
      });

      LigneService.getAllLigne().then(function(res){
        $scope.ligne=res;
      });

      $scope.gotoPosLigne=function ($id) {
            $Map.zoom(12);
            var found =$Map.findBy(function(marker){
              return marker.id==$id;
              });
            $Map.gMap.setCenter(found[0].getPosition());
        };

    $scope.gotoPosStation=function ($id) {
      var found =$Map.findBy(function(marker){
                return marker.id==$id;
              });
            $Map.gMap.setCenter(found[0].getPosition());
            found[0].info.open($Map.gMap,found[0]);
      $Map.zoom(17);
        };


        
        function distance(origin,destination){
          var LatLngOri= new google.maps.LatLng(parseFloat(origin.Pos.lat),parseFloat(origin.Pos.lng));
          var LatLngDest= new google.maps.LatLng(parseFloat(destination.Pos.lat),parseFloat(destination.Pos.lng));
          var dist=  google.maps.geometry.spherical.computeDistanceBetween(LatLngOri, LatLngDest);
          return Math.round(dist);
        };
        $scope.searchIti=[];
        function findStatLigne(origin,destination,save){
          var tabFound=[];
          var tabFoundDest=[];
            var tabCu={};

          var found=[];
          var foundDest=[];
          var ligneOr=null;
          var ligneDest=null;
          var currentligne=null;
          var interligne=null;
          var originIndex;
          var destinationIndex;
          $scope.ligne.some(function(ligne, index) {

            ligne.stations.some(function(s,index){
              
              
              var tab=[];
              tab.push(s.station);
              found= $filter('filter')(tab,{_id:origin._id}, true);
              foundDest= $filter('filter')(tab,{_id:destination._id}, true);
              if (found.length!=0 ) {
                
                var format={
                  originIndex:index,
                  ligneOr:ligne
                  };
                  tabFound.push(format);
                }

              if (foundDest.length!=0 ) {
                var format={
                  destinationIndex: index,
                  ligneDest:ligne
                  };
                tabFoundDest.push(format);
                }       
            });

          });

          var trouve=false;
          tabFound.some(function(objori,index){
            tabFoundDest.some(function(objdest,index){

              if (objori.ligneOr._id===objdest.ligneDest._id) {
                currentligne=objori.ligneOr;
                 tabCu={
                        currentligne: currentligne,
                        originIndex: objori.originIndex,
                        destinationIndex: objdest.destinationIndex
                        };
                trouve=true;
              } 
            });
          });
          if (trouve) {

            return tabCu;
          } else{
              tabCu={
                    ligneOr: tabFound,
                    ligneDest: tabFoundDest
                    };
                    return tabCu;
          } 


        }

        $scope.finditi=function(origin,destination) {
          var originIndex;
          var destinationIndex;
          var ligneTemp=[];
          var diststation=0;
          $scope.stationligne=[];


          if ($scope.directionDisplay) {
              $scope.directionDisplay.setMap(null);
          }
      $scope.directionService= new google.maps.DirectionsService();
          $scope.directionDisplay= new google.maps.DirectionsRenderer({
            'map':$Map.gMap
          });
          var tab = findStatLigne(origin,destination,true);
          if ((tab.ligneOr!=null)&&(tab.ligneDest!=null)) {
            tab.ligneOr.some(function(ligneor,index){
              
              tab.ligneDest.some(function(lignedest,index){
                ligneor.ligneOr.stations.some(function(stationOr,index){
              
                  lignedest.ligneDest.stations.some(function(stationDest,index){
                      var tabInt = findStatLigne(stationOr.station,stationDest.station,true);
                      if (tabInt.currentligne!=null) {
                       
                          for (var i = tab.ligneOr[0].originIndex; i <=tabInt.originIndex+1 ; i++) {
                              ligneTemp.push(tab.ligneOr[0].ligneOr.stations[i]);
 
                          }
                          
                          for (var j = tabInt.originIndex+1; j <=tabInt.destinationIndex ; j++) {
                              ligneTemp.push(tabInt.currentligne.stations[j]);
                             
                          }
                           
                          for (var k = tabInt.destinationIndex+1; k <=tab.ligneDest[0].destinationIndex ; k++) {
                              ligneTemp.push(tab.ligneDest[0].ligneDest.stations[k]);  
                          }
                          TransmapFact.drawLigne(ligneTemp,0,ligneTemp.length-1,$scope);
                          $scope.dist=distance(origin,destination);
                          $scope.stationligne=ligneTemp;
                           console.log($scope.stationligne);
                          
                      } else{
                       
                        var tabligneor= tabInt.ligneOr;
                          var tabdist=[];
                           var tabDistmin={};
                          for (var i = 0; i < tabligneor.length; i++) {
                            for (var j = 0; j < tabligneor[i].ligneOr.stations.length; j++) {
                       
                             
                              var newmin=distance(tabligneor[i].ligneOr.stations[j].station,destination);
                              tabdist.push(newmin);
                              var min=Math.min(tabdist);
                              console.log(tabligneor[i].ligneOr.stations[j].station);
                              console.log(destination);
                              console.log(min);
                          }
                        }
                      }

                  });
                });   
          });
        });

      }else  { 
        TransmapFact.drawLigne(tab.currentligne.stations,tab.originIndex,tab.destinationIndex,$scope);
        $scope.stationligne=tab.currentligne.stations;
        $scope.stationligne.splice(tab.destinationIndex+1,$scope.stationligne.length-(tab.destinationIndex+1));
        $scope.stationligne.splice(0,tab.originIndex);
        $scope.dist=distance(origin,destination);
        } 
      }
  });
});