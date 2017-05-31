/**
 * Created by GMI-PC on 24/03/2017.
 */
var JwtStrategy = require('passport-jwt').Strategy;

// load up the voyageur model
var Voyageur = require('../app/models/voyageur');
var Admin    = require('../app/models/admin');
var config   = require('../config/database'); // get db config file

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Voyageur.findOne({id: jwt_payload.id}, function(err, voyageur) {
            if (err) {
                return done(err, false);
            }
            if (voyageur) {
                done(null, voyageur);
            } else {
                done(null, false);
            }
        });
    }));
};

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Admin.findOne({id: jwt_payload.id}, function(err, admin) {
            if (err) {
                return done(err, false);
            }
            if (admin) {
                done(null, admin);
            } else {
                done(null, false);
            }
        });
    }));
};