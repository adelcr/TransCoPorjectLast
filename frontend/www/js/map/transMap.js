angular.module('starter.map',[])


  var transMap =(function(){
    function transMap(element,opts){
      this.gMap= new google.maps.Map(element,opts);
      this.markers=list.create();
      if (opts.cluster) {
        this.markerClusterer = new MarkerClusterer(this.gMap, [],opts.cluster.options);

      };
      }
    transMap.prototype={
      zoom: function(level){
        if(level){
          this.gMap.setZoom(level);
        }else {
          return this.gMap.getZoom();
        }
      },
      _on: function(opts){
        var self= this;
        google.maps.event.addListener(opts.obj, opts.event,function(e){
          opts.callback.call(self, e);
        });
      },
      addMarker: function(opts){
        var marker;
        opts.position ={
          lat: opts.lat,
          lng: opts.lng
        }
      marker=this._createMarker(opts);
      this.markers.add(marker);
      if (this.markerClusterer) {
       this.markerClusterer.addMarker(marker);
      };
      if(opts.event){
        this._on({
          obj: marker,
          event: opts.event.name,
          callback: opts.event.callback
        });
        }
        if(opts.content){
          this._on({
            obj: marker,
            event: 'click',
            callback:function(){
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content
              });
              infoWindow.open(this.gMap, marker);
            }
          });
        }
      return marker;
    },
    _createMarker: function(opts){
      opts.map= this.gMap;
      return new google.maps.Marker(opts);
    },
    findBy:function(callback){

    return this.markers.find(callback);

    },
    removeBy: function(marker){
            if (this.markerClusterer) {
              this.markerClusterer.removeMarker(marker);
            }else{
              this.markers.remove(marker);
              marker.setMap(null);
            }
      },
    findMarkerByLat: function(lat){
      for(var i=0; i < this.markers.length; i++){
        var marker= this.markers[i];
        if(marker.position.lat()=== lat){
          return marker;
        }
      }
    }
    };

    return transMap;
  }());

  transMap.create = function(element,opts) {
    return new transMap(element,opts);
  }
