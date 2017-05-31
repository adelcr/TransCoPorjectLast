
var jwt         = require('jwt-simple');
var Bus    = require('../../app/models/bus'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');
var bodyParser = require('body-parser').json();
var apiBus = express.Router();

apiBus.post('/add', function(req, res) {
    if (!req.body.matricule ) {
        res.json({success: false, msg: 'Please pass the matricule of the bus.'});
    } else {
        var newBus = new Bus({
            'matricule': req.body.matricule,
        });
        newBus.save(function(err) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new Bus.',bus: newBus});
        });
    }
});
apiBus.get('/all', function(req, res) {
    Bus.find()
    .populate('voyage')
    .exec( function(err, buss) {
        if (err) throw err;

        if (!buss) {
            res.send({success: false, msg: 'fail to load all Buss.'});
        } 
        else {
            res.json({success: true, buss: buss});  
        }

    });
});

apiBus.get('/get/:id', function(req, res) {
    Bus.findById(req.params.id, function(err, bus) {
        if (err) throw err;

        if (!bus) {
            res.send({success: false, msg: 'fail to load Buss.'});
        } 
        else {
            res.json({success: true, bus: bus});  
        }

    });
});

apiBus.delete('/remove/:id',function (req,res,next) {

        Bus.findByIdAndRemove(req.params.id, function (err,bus) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete Bus Successful "+bus._id});
            }

        });

});

apiBus.put('/update/:id',bodyParser,function (req,res,next) {
        var newBus = req.body;
        console.log(req.body.voyage);
        delete newBus._id;

        console.log(req.params.id);
        Bus.findByIdAndUpdate( req.params.id,newBus,{new: true},function (err,bus) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update Bus Successful ",bus:bus});
            }

        });

});


module.exports = apiBus;