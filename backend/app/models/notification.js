var Station    = require('../../app/models/station');
var Voyage    = require('../../app/models/voyage');
var Voyageur    = require('../../app/models/voyageur');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema =new Schema({

    station: { type: Schema.Types.ObjectId,ref: 'Station'},
    voyage: { type: Schema.Types.ObjectId,ref: 'Voyage'},
    voyageur: { type: Schema.Types.ObjectId,ref: 'Voyageur'},
});

module.exports = mongoose.model('Notification', NotificationSchema);