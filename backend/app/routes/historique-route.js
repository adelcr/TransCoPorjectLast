
var Historique    = require('../../app/models/historique'); // get the mongoose model
var Bus    = require('../../app/models/bus'); // get the mongoose model
var Ligne = require('../../app/models/ligne');
var Voyage = require('../../app/models/voyage');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiHistorique = express.Router();

apiHistorique.post('/add', function(req, res) {
    if (!req.body.bus ) {
        res.json({success: false, msg: 'Erreur bad request.'});
    } else {
    Bus.findById(req.body.bus)    
        .populate({
            path:'voyage',
            populate: { path: 'ligne',model: Ligne}
        })
        .exec(function(err, bus) {
        if (err) throw err;
        if (!bus) {
            res.send({success: false, msg: 'fail to load bus.'});
        } 
        else {
            var station=bus.voyage.ligne.stations.filter(function (element) {
            return element.station == req.body.station;
        });
            var date=new Date(bus.voyage.dateDepart);
            var dureMinutes=Math.ceil((station[0].duration%3600)/60);
            var dureHours=Math.floor(station[0].duration/3600);
            date.setHours(date.getHours()+dureHours);
            date.setMinutes(date.getMinutes()+dureMinutes);
            var dateEstimer=date;
            var arriver=new Date(req.body.arriver);
            
            var newHistorique = new Historique({
            'bus': bus._id,
            'voyage': bus.voyage._id,
            'ligne': bus.voyage.ligne._id,
            'station': req.body.station,
            'dateDepart': bus.voyage.dateDepart,
            'jour':  arriver.getDay(),
            'dateEstimer': dateEstimer,
            'dateArriver': req.body.arriver
        });
              // save the user
              
        newHistorique.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Erreur.'});
            }
            
        });
        
        if(station[0].order==bus.voyage.ligne.stations.length){

            Historique.find()
            .where('jour').equals(arriver.getDay())
            .where('station').equals(req.body.station)
            .where('voyage').equals(bus.voyage._id)
            .populate('voyage')
            .exec(function(err, historiques) {
                var estimation= bus.voyage.estimation.filter(function (element) {
            return element.jour == arriver.getDay();
        });
                var durMoyenne=estimation[0].duration*1000;
                for (var i =0; i <historiques.length ; i++) {
                    date=new Date(historiques[i].dateArriver);
                    date.setYear(1969);
                    date.setMonth(12);
                    date.setDate(1);
                    var est = (date.getTime())-(new Date(historiques[i].dateDepart).getTime());

                  durMoyenne+=(est); 
                };
                  
                durMoyenne= Math.floor(durMoyenne/(historiques.length+1));
               console.log(durMoyenne/1000);
                index=bus.voyage.estimation.indexOf(estimation[0]);
                console.log(index);
                bus.voyage.estimation[index].duration=Math.floor(durMoyenne/1000);
                bus.voyage.estimation[index].dateArriver=new Date(bus.voyage.estimation[index].dateArriver.getTime()+durMoyenne);
                var voyage=bus.voyage;
                voyage.save();
       

            });
        }
        res.json({success: true, msg: 'Successful created new station.', historique: newHistorique});
        }
    });
    }
    
});
apiHistorique.get('/all', function(req, res) {
    Historique.find()
    .populate('bus','matricule')
    .populate('voyage')
    .populate('ligne','-stations -description')
    .populate('station','-image -Pos')
    .exec(function(err, historiques) {
        if (err) throw err;

        if (!historiques) {
            res.send({success: false, msg: 'fail to load all historiques.'});
        } 
        else {
            res.json({success: true, historiques: historiques});  
        }

    });
});
module.exports = apiHistorique;
