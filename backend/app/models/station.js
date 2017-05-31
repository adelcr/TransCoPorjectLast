/**
 * Created by GMI-PC 
 */
// Station, Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StationSchema =new Schema({
    name: {type: String, index:true, required: true},
    image: {type: String},
    description:{type: String},

    Pos:{
        lat: { type: Number, required: true },
        lng: { type: Number, required: true}
    }
});




module.exports = mongoose.model('Station', StationSchema);