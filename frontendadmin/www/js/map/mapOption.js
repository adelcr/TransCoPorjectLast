angular.module('starter.map',[])
var mapOption;
function optionInt(latLng) {
mapOption={
  center:latLng ,
  zoom: 15,
  disableDefaultUI:false,
  scrollwheel: true,
  draggable: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_CENTER
          },
  zoomControlOptions:{
    position:  google.maps.ControlPosition.LEFT_BOTTOM,
    style: google.maps.ZoomControlStyle.DEFAULT
  },
  panControlOptions: {
    position:  google.maps.ControlPosition.LEFT_BOTTOM
  },
  cluster: {  // initialisation cluster
    options:{
      maxZoom: 12,
      styles:[{
        url: 'img/m1.png',
              height:56,
              width:55,
              textSize: 12
      },{
              url: 'img/m4.png',
              height:75,
              width:80,
              textSize: 18
          }]
    }
  }
}
return mapOption;
}
