var Ligne    = require('../../app/models/ligne');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoyageSchema =new Schema({

    ligne: { type: Schema.Types.ObjectId,ref: 'Ligne'},
    dateDepart: {type: Date, required: true},
    dateArriver: {type: Date, required: true}
});

module.exports = mongoose.model('Voyage', VoyageSchema);