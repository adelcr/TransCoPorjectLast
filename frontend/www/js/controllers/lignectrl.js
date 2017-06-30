angular.module('starter.controllers')

.controller('LigneCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,LigneService,StationService) {

  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions=optionInt(myPos);
    var $Map= new transMap(document.getElementById("map"),mapOptions);
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
  $scope.currenetLigneShow= "selectionnez une ligne dans le menu à droite";
      $scope.currenetLigne=null;
        $scope.toggleGroup = function(group) {
        group.show = !group.show;
        if (group.show==true) {
          if ($scope.currenetLigne!=null) {
            $scope.currenetLigne.show=false;
            if ($scope.directionDisplay) {
              $scope.directionDisplay.setMap(null);
            }
          }
          $scope.stat=group.stations;
            $scope.currenetLigne= group;
            $scope.currenetLigneShow=group.name;
            if ($scope.currenetLigne.stations.length!=0) {
              $scope.drawLigne($scope.currenetLigne);
            }
        }
        if(group.show==false) {
          console.log("ok");
          $scope.currenetLigne=null;
          $scope.stat=null;
          $scope.currenetLigneShow= "selectionnez une ligne dans le menu à droite";
          if ($scope.directionDisplay) {
            $scope.directionDisplay.setMap(null);
          }
        }
      };
      $scope.isGroupShown = function(group) {
        return group.show;
      };

        
        function distance(origin,destination){
          var LatLngOri= new google.maps.LatLng(parseFloat(origin.Pos.lat),parseFloat(origin.Pos.lng));
          var LatLngDest= new google.maps.LatLng(parseFloat(destination.Pos.lat),parseFloat(destination.Pos.lng));
          var dist=  google.maps.geometry.spherical.computeDistanceBetween(LatLngOri, LatLngDest);
          return Math.round(dist);
        };
        $scope.searchIti=[];
        function hasNext(station){
          var node={
              id:station._id,
              station: station,
              previous:[],
              next:[]
          }
          station.lignes.forEach(function(ligne,index){
            var lignenext= $filter('filter')($scope.ligne,{_id:ligne.ligne}, true);
              if(lignenext[0].stations[ligne.order]){
                var next={
                  id:lignenext[0].stations[ligne.order].station._id,
                  station:lignenext[0].stations[ligne.order].station,
                  ligne:ligne.ligne
              };
              var existtow= $filter('filter')(node.next,{id:next.id}, true);
              if (existtow.length==0) {
                node.next.push(next);
              }
              

            }
            if(lignenext[0].stations[ligne.order-2]){
                var previous={
                  id:lignenext[0].stations[ligne.order-2].station._id,
                  station:lignenext[0].stations[ligne.order-2].station,
                  ligne:ligne.ligne
                };
                node.previous.push(previous);
              }

          });
          if(node.next.length==0){
              node={
                id:station._id,
                station: station,
                previous:node.previous
              }
            return node;

          }else if(node.previous.length==0){
              node={
                id:station._id,
                station: station,
                next:node.next
              }

            return node;
          }
        return node;
        }
        function DrawGraph(origin,graph){
          
          var node = hasNext(origin);
          var exist= $filter('filter')(graph,{id:node.id}, true);

          if(exist.length===0){
                 graph.push(node);
          }
          if(!node.next){          
              return graph;
          } else{
              node.next.forEach(function(next,index){
              graph= DrawGraph(next.station,graph);

              });
              return graph

          }
        }
        
        
        function PathToFound2(graph,source,destination,tabqueue,tmp_queue,indice){
          if(source.id!=destination._id){
              var tmp_queue2=[];
              tmp_queue2 = tmp_queue2.concat(tmp_queue);
                tmp_queue2.push(source);
                var test=false;
                if (tabqueue[indice]) {
                  if (tabqueue[indice].length>0) {
                    do{
                      if(tabqueue[indice][tabqueue[indice].length-1].next){
                        tabqueue[indice][tabqueue[indice].length-1].next.forEach(function(next,index){
                          if (next.id==source.id) {
                            test=true;
                          }
                        });
                      }
                      if (test==false) {
                        indice++;
                      }
                    }while((indice<tabqueue.length)&&(test==false));

                  } 
            }
            tabqueue[indice]=tmp_queue2;          

              if(source.next){              
              if(source.next.length>1){
                for (var i = 0; i <source.next.length; i++) {
                  if(i==0){
                  var fils0= $filter('filter')(graph,{id:source.next[i].id}, true);
                  tabqueue=PathToFound2(graph,fils0[0],destination,tabqueue,tmp_queue2,indice);
                  
                  } else{
                    var fils= $filter('filter')(graph,{id:source.next[i].id}, true);
                  tabqueue=PathToFound2(graph,fils[0],destination,tabqueue,tmp_queue2,indice+1);
                  }
                  
                  
                }
                }else{
                  var fils0= $filter('filter')(graph,{id:source.next[0].id}, true);
                    tabqueue=PathToFound2(graph,fils0[0],destination,tabqueue,tmp_queue2,indice);
                }     
            }
            
            }else{
            var tmp_queue2=[];
            tmp_queue2 = tmp_queue2.concat(tmp_queue);
            tmp_queue2.push(source);
              tabqueue[indice]=tmp_queue2;
              return tabqueue;
            }     
            
                  
                  return tabqueue;
   
        }
        $scope.finditi=function(origin,destination) {
          var graph=[];
          var tabqueue=[];
          var tabint= [];
          var tabresult=[];
          var matrix=[];

          if ($scope.directionDisplay) {
              $scope.directionDisplay.setMap(null);
          }
      $scope.directionService= new google.maps.DirectionsService();
          $scope.directionDisplay= new google.maps.DirectionsRenderer({
            'map':$Map.gMap
          });
          graph = DrawGraph(origin,graph);
          

          tabqueue[0]=tabint;
          tabqueue=PathToFound2(graph,graph[0],destination,tabqueue,tabint,0);
          tabqueue.forEach(function(queue,indice){

              if (queue[queue.length-1].id==destination._id) {
 
                matrix.push(queue);
              }
            });

        TransmapFact.drawLignenew(matrix[0],0,matrix[0].length-1,$scope);
        $scope.dist=distance(origin,destination);
        $scope.stationligne=matrix[0];
        $scope.matrice=matrix;
        $scope.origin=origin;
        $scope.destination=destination;
          console.log(tabqueue);
          console.log($scope.matrice);
         };
       });
});
        
