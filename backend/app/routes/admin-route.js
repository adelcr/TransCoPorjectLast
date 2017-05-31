/**
 * Created by GMI-PC on 25/03/2017.
 */
var jwt         = require('jwt-simple');
var Admin    = require('../../app/models/admin'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file


require('../../config/passport')(passport);
var apiAdmin = express.Router();

apiAdmin.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newAdmin = new Admin({
            'User.name': req.body.name,
            'User.password': req.body.password
        });

        // save the user
        newAdmin.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

apiAdmin.post('/authenticateadmin', function(req, res) {
    Admin.findOne({
        'User.name': req.body.name
    }, function(err, admin) {
        if (err) throw err;

        if (!admin) {
            res.send({success: false, msg: 'Authentication failed. Admin not found.'});
        } //a fuckin problem here check it later!!!!!!!
        else {
            // check if password matches
            console.log("--------------------");
            console.log(admin.User.password);
            console.log(req.body.password);

            //admin.User.comparePassword(req.body.password, function (err, isMatch) {
            if(req.body.password===admin.User.password){
                // console.log(isMatch);

                    // if user is found and password is right create a token
                    var token = jwt.encode(admin, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            //});
        }

    });
});
apiAdmin.get('/memberinfoadmin', passport.authenticate('jwt',{session: false}),function (req,res) {
    var token = getToken(req.headers);
    if (token){
        var decoded = jwt.decode(token,config.secret);
        Admin.findOne({
            'User.name': decoded.User.name
        }, function (err,admin) {
            if (err) throw err;
            if (!admin){
                return res.status(403).send({success: false, msg:"Authentifaiction failed" });
            }else {
                return res.json({success: true,admin: admin});
            }

        });

    }else {
        return res.status({success: false, msg: 'No token provided.'});

    }
});
getToken =function (headers) {
    if (headers && headers.authorization){
        var parted =headers.authorization.split(' ');
        if (parted.length === 2){
            return parted[1];
        }else {
            return null;
        }
    }else {
        return null;
    }

};
module.exports = apiAdmin;