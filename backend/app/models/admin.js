/**
 * Created by GMI-PC on 24/03/2017.
 */
// Voyageur, Model

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var AdminSchema =new Schema({
    matricule: {type: Number, index:true},

    User:{
        email: { type: String, lowercase: true, trim: true }

        , name: { type: String, required: true}

        , image: {type: String}

        , login: { type: String, lowercase: true }

        , password: { type: String, required: true}
        
        , role : { type: String, required: true}



    }
});


AdminSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', AdminSchema);