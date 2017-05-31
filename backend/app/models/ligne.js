/**
 * Created by GMI-PC 
 */
// PosBus, Model
var Station    = require('../../app/models/station');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LigneSchema =new Schema({

    name: {type: String,  required: true},
    description: {type: String, required: true},
    duree:{type:Number},
    stations : [{
    	station: { type: Schema.Types.ObjectId,ref: 'Station'},
    	order: {type:Number},
    	duration:{type:Number}
    }]
});

module.exports = mongoose.model('Ligne', LigneSchema);