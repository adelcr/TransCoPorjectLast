
var Favorie    = require('../../app/models/favorie'); // get the mongoose model
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiFavorie = express.Router();

apiFavorie.post('/add', function(req, res) {
    
    if (!req.body.ligne || !req.body.voyage || !req.body.station  || !req.body.voyageur  ) {
        res.json({success: false, msg: 'Please pass ligne or voyage or voyageur.'});
    } else {

        var newFavorie = new Favorie({
            'ligne': req.body.ligne,
            'station': req.body.station,
            'voyage': req.body.voyage,
            'voyageur': req.body.voyageur
        });

       console.log(newFavorie);
        // save the user
        newFavorie.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new favorie.', favorie: newFavorie});
        });
    }
});

apiFavorie.get('/all', function(req, res) {
    Favorie.find({
    }, function(err, favories) {
        if (err) throw err;

        if (!favories) {
            res.send({success: false, msg: 'fail to load all favorie.'});
        } 
        else {
            res.json({success: true, favories: favories});  
        }

    });
});

apiFavorie.get('/get/:id', function(req, res) {
    Favorie.findById(req.params.id, function(err, favorie) {
        if (err) throw err;
        if (!favorie) {
            res.send({success: false, msg: 'fail to load favorie.'});
        } 
        else {
            res.json({success: true, favorie: favorie});  
        }

    });
});

apiFavorie.put('/update/:id',function (req,res,next) {

     var newFavorie = {
            'voyage': req.body.voyage
                    };

        Favorie.findByIdAndUpdate( req.params.id,newFavorie,{new: true},function (err,favorie) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update favorie Successful ",favorie:favorie});
            }

        });

});

apiFavorie.delete('/remove/:id',function (req,res,next) {

        Favorie.findByIdAndRemove(req.params.id, function (err,favorie) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete favorie Successful ",favorie:favorie});
            }

        });

});

apiFavorie.get('/getbyligne/:id', function(req, res) {
    Favorie.find({ 'ligne': req.params.id })
    .exec(function(err, favories) {
        if (err) throw err;
        if (!favories) {
            res.send({success: false, msg: 'fail to load favorie.'});
        } 
        else {
            res.json({success: true, favories: favories});  
        }

    });
});

apiFavorie.get('/getbyvoyage/:id', function(req, res) {
    Favorie.find({ 'voyage': req.params.id })
    .exec(function(err, favories) {
        if (err) throw err;
        if (!favories) {
            res.send({success: false, msg: 'fail to load favorie.'});
        } 
        else {
            res.json({success: true, favories: favories});  
        }

    });
});

apiFavorie.get('/getbyvoyageur/:id', function(req, res) {
    Favorie.find({ 'voyageur': req.params.id })
    .exec(function(err, favories) {
        if (err) throw err;
        if (!favories) {
            res.send({success: false, msg: 'fail to load favorie.'});
        } 
        else {
            res.json({success: true, favories: favories});  
        }

    });
});


module.exports = apiFavorie;