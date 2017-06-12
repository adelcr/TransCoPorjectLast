
var Voyage    = require('../../app/models/voyage'); // get the mongoose model
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiVoyage = express.Router();

apiVoyage.post('/add', function(req, res) {
    
    if (!req.body.ligne ) {
        res.json({success: false, msg: 'Please pass ligne.'});
    } else {
        var dateDepart= new Date(req.body.dateDepart);

        var dateArriver= new Date(req.body.dateArriver);
        var newVoyage = new Voyage({
            'ligne': req.body.ligne,
            'dateDepart': dateDepart
        });
        console.log(req.body.dateDepart);
        console.log(dateDepart);

        console.log(req.body.dateArriver);
        console.log(dateArriver);
        for (var i =0; i <= 6; i++) {
            var estimation={
                jour:i,
                duration:req.body.duree,
                dateArriver:dateArriver
            }
            newVoyage.estimation.push(estimation);
        };
       console.log(newVoyage);
        // save the user
        newVoyage.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new voyage.', voyage: newVoyage});
        });
    }
});
apiVoyage.get('/all', function(req, res) {
    Voyage.find({
    }, function(err, voyages) {
        if (err) throw err;

        if (!voyages) {
            res.send({success: false, msg: 'fail to load all voyages.'});
        } 
        else {
            res.json({success: true, voyages: voyages});  
        }

    });
});

apiVoyage.get('/get/:id', function(req, res) {
    Voyage.findById(req.params.id, function(err, voyage) {
        if (err) throw err;
        if (!voyage) {
            res.send({success: false, msg: 'fail to load voyage.'});
        } 
        else {
            res.json({success: true, voyage: voyage});  
        }

    });
});
apiVoyage.get('/getbyligne/:id', function(req, res) {
    Voyage.find({ 'ligne': req.params.id })
    .sort("dateDepart")
    .exec(function(err, voyages) {
        if (err) throw err;
        if (!voyages) {
            res.send({success: false, msg: 'fail to load voyage.'});
        } 
        else {
            res.json({success: true, voyages: voyages});  
        }

    });
});

apiVoyage.delete('/remove/:id',function (req,res,next) {

        Voyage.findByIdAndRemove(req.params.id, function (err,voyage) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete voyage Successful ",voyage:voyage});
            }

        });

});

apiVoyage.put('/update/:id',function (req,res,next) {

     var newVoyage = {
            'ligne': req.body.ligne,
            'dateDepart': req.body.dateDepart,
            'dateArriver': req.body.dateArriver
        };

        Voyage.findByIdAndUpdate( req.params.id,newVoyage,{new: true},function (err,voyage) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update voyage Successful ",voyage:voyage});
            }

        });

});

module.exports = apiVoyage;