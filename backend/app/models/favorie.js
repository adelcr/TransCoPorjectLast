var Ligne    = require('../../app/models/ligne');
var Station    = require('../../app/models/station');
var Voyage    = require('../../app/models/voyage');
var Voyageur    = require('../../app/models/voyageur');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavorieSchema =new Schema({

    ligne: { type: Schema.Types.ObjectId,ref: 'Ligne'},
    station: { type: Schema.Types.ObjectId,ref: 'Station'},
    voyage: { type: Schema.Types.ObjectId,ref: 'Voyage'},
    voyageur: { type: Schema.Types.ObjectId,ref: 'Voyageur'},
    datecreate:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Favorie', FavorieSchema);