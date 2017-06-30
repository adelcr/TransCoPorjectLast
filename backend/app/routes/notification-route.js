
var Favorie    = require('../../app/models/favorie'); // get the mongoose model
var Notification    = require('../../app/models/notification'); // get the mongoose model
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiNotification = express.Router();

apiNotification.post('/add', function(req, res) {
    
    if (!req.body.voyage || !req.body.station   ) {
        res.json({success: false, msg: 'Please pass ligne or voyage or voyageur.'});
    } else {
        
        Favorie.find()
            .where('station').equals(req.body.station)
            .where('voyage').equals(req.body.voyage)
            .exec(function(err, notif) {
                for (var i =0; i <notif.length ; i++) {
        var newNotification = new Notification({
            'station': notif[i].station,
            'voyage': notif[i].voyage,
            'voyageur': notif[i].voyageur
          
        });
            newNotification.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Erreur.'});
                }
                res.json({success: true, msg: 'Successful created new notification.', notification: newNotification});
                
                });
                    
            }

            });  
      
        }
});

apiNotification.delete('/remove/:id',function (req,res,next) {

        Notification.findByIdAndRemove(req.params.id, function (err,notification) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete notification Successful ",notification:notification});
            }

        });

});



module.exports = apiNotification;
