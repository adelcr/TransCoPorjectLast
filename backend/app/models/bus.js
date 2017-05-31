/**
 * Created by GMI-PC 
 */
// Bus, Model
var Voyage    = require('../../app/models/voyage');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusSchema =new Schema({
	matricule: {type: Number, required: true, unique: true},
    available: {type: Boolean, required: true,default:false},
    speed: {type: Number, required: true,default:0},
    numberp:{type: Number, required: true,default:0},
    voyage: { type: Schema.Types.ObjectId,ref: 'Voyage'},
    Pos:{
        lat: { type: Number, default:0},
        lng: { type: Number, default:0}
    }
});




module.exports = mongoose.model('Bus', BusSchema);