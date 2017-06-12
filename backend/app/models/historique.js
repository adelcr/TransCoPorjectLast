
// Historique, Model
var Voyage    = require('../../app/models/voyage');
var Bus    = require('../../app/models/bus');
var Ligne    = require('../../app/models/ligne');
var Station    = require('../../app/models/station');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoriqueSchema =new Schema({
	bus:{ type: Schema.Types.ObjectId,ref: 'Bus'},
	voyage: { type: Schema.Types.ObjectId,ref: 'Voyage'},
    ligne: { type: Schema.Types.ObjectId,ref: 'Ligne'},
    station: { type: Schema.Types.ObjectId,ref: 'Station'},
    jour :{type:String},
    dateDepart:{type: Date, required: true,default:0},
    dateEstimer:{type: Date, required: true,default:0},
    dateArriver:{type: Date, required: true,default:0}
});




module.exports = mongoose.model('Historique', HistoriqueSchema);