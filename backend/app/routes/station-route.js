
var Station    = require('../../app/models/station'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiStation = express.Router();

apiStation.post('/addst', function(req, res) {
    
    if (!req.body.name ) {
        res.json({success: false, msg: 'Please pass name of station.'});
    } else {
        var newstation = new Station({
            'name': req.body.name,
            'image': req.body.image,
            'Pos.lat': req.body.lat,
            'Pos.lng': req.body.lng
        });
       
        // save the user
        newstation.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new station.', station: newstation});
        });
    }
});
apiStation.get('/allst', function(req, res) {
    Station.find({
    }, function(err, stations) {
        if (err) throw err;

        if (!stations) {
            res.send({success: false, msg: 'fail to load all stations.'});
        } 
        else {
            res.json({success: true, stations: stations});  
        }

    });
});

apiStation.get('/getst/:id', function(req, res) {
    Station.findById(req.params.id, function(err, station) {
        if (err) throw err;
        if (!station) {
            res.send({success: false, msg: 'fail to load stations.'});
        } 
        else {
            res.json({success: true, station: station});  
        }

    });
});

apiStation.delete('/removest/:id',function (req,res,next) {

        Station.findByIdAndRemove(req.params.id, function (err,station) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete station Successful ",station:station});
            }

        });

});

apiStation.put('/updatst/:id',function (req,res,next) {

     var newstation = {
            'name': req.body.name,
            'Pos.lat': req.body.lat,
            'Pos.lng': req.body.lng
        };

        Station.findByIdAndUpdate( req.params.id,newstation,{new:true},function (err,station) {
            if (err){
             throw err;
            }else {
                station.name=req.body.name;
                return res.json({success: true,msg: "update station Successful ",station:station});
            }

        });

});

module.exports = apiStation;
