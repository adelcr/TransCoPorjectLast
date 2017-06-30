
var Ligne    = require('../../app/models/ligne'); // get the mongoose model
var Station    = require('../../app/models/station'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');
var bodyParser =require('body-parser').json();
var apiLigne = express.Router();

apiLigne.post('/add', function(req, res) {
    
    if (!req.body.name ) {
        res.json({success: false, msg: 'Please pass name of ligne.'});
    } else {
        var newligne = new Ligne({
            'name': req.body.name,
            'description': req.body.description,
            'duree':0
        });
       
        // save the user
        newligne.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new ligne.', ligne: newligne});
        });
    }
});
apiLigne.put('/update/:id',function (req,res,next) {

    Ligne.findById(req.params.id, function(err, ligne) {
            
        ligne.duree=req.body.duree;
        for (var i =1; i < ligne.stations.length; i++) {

            ligne.stations[i].duration=req.body.dureStation[i-1].duration
        };
        Ligne.findByIdAndUpdate( ligne._id,ligne,{new:true})
        .populate('stations.station','-image')
        .exec(function (err,li) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update station Successful ",ligne:li});
            }
        });
    });

});
apiLigne.post('/addst', function(req, res) {
    
    if (!req.body.id ) {
        res.json({success: false, msg: 'Please pass name of station.'});
    } else {
    Ligne.findById(req.body.id, function(err, ligne) {
    		var station={
    			station:req.body.station,
    			order:req.body.order
    		};
        Station.findById(req.body.station, function(err, station) {
            var li={
                ligne: ligne._id,
                order:req.body.order
            }
            station.lignes.push(li);
            station.save();

        });
    		
    		ligne.stations.push(station);
    		console.log(ligne);
    		Ligne.findByIdAndUpdate( ligne._id,ligne,{new:true})
            .populate('stations.station','-image')
            .exec(function (err,li) {
	            if (err){
	             throw err;
	            }else {
	                return res.json({success: true,msg: "update station Successful ",ligne:li});
	            }
        	});
    	});
 
    }
});
apiLigne.post('/updatest', function(req, res) {
    
    if (!req.body.id ) {
        res.json({success: false, msg: 'Please pass name of station.'});
    } else {
    Ligne.findById(req.body.id, function(err, ligne) {
            
            var stations= req.body.stations;

            ligne.stations=stations; 
            console.log(ligne);
            ligne.save();
            Ligne.findById( ligne._id)
            .populate('stations.station','-image')
            .exec(function (err,li) {
                if (err){
                 throw err;
                }else {
                    return res.json({success: true,msg: "update station Successful ",ligne:li});
                }
            });
        });
 
    }
});

apiLigne.get('/all', function(req, res) {
    Ligne.find()
    .populate('stations.station','-image')
    .exec(function(err, lignes) {
        if (err) throw err;

        if (!lignes) {
            res.send({success: false, msg: 'fail to load all ligne.'});
        } 
        else {
            res.json({success: true, lignes: lignes});  
        }

    });
});
apiLigne.delete('/remove/:id',function (req,res,next) {
    Ligne.findByIdAndRemove(req.params.id, function (err,ligne) {
        if (err){
         throw err;
        }else {
            return res.json({success: true,msg: "delete ligne Successful ",ligne:ligne});
        }
    });
});
module.exports = apiLigne;