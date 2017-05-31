/**
 * Created by GMI-PC on 24/03/2017.
 */
// Voyageur, Model

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var VoyageurSchema =new Schema({
    cin: {type: Number },

    User:{
         email: { type: String, lowercase: true, trim: true }

        , name: { type: String, required: true  }

        , lastname:{ type: String, required: true  }

        , adress:{ type: String, required: true  }

        , phone:{ type: Number }

        , image: {type: String}

        , login: { type: String, lowercase: true, unique:true, trim: true }

        , password: { type: String, required: true}
        
        , role : { type: String, required: true}
    },
    ComptePaiement:{
        exist: {type: Boolean, required: true}

        ,connected : {type: Boolean, default:false}

        ,created: {type: Date,default: Date.now}

        , NumberCard: {type: Number, unique: true }
        
        , solde: {type: Number, required: true}

    }
});
VoyageurSchema.pre('save', function (next) {
    var voyageur = this;

    if (this.isModified('this.User.password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(voyageur.User.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                voyageur.User.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/*VoyageurSchema.pre('update', function (next) {
    var voyageur = this;

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(voyageur.User.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                voyageur.User.password = hash;
                next();
            });
        });

});*/

VoyageurSchema.methods.comparePassword = function (passw, cb) {
   
    bcrypt.compare(passw, this.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

VoyageurSchema.methods.hashPassword= function (password) {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("my password", salt);
    return hash;
};


module.exports = mongoose.model('Voyageur', VoyageurSchema);