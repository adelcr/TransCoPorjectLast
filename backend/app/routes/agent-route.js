/**
 * Created by GMI-PC on 25/03/2017.
 */
var jwt         = require('jwt-simple');
var Agent    = require('../../app/models/admin'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var bodyParser = require('body-parser').json();


require('../../config/passport')(passport);
var apiAgent = express.Router();


// add new Agent
apiAgent.post('/add', function(req, res) {
    if (!req.body.matricule ||!req.body.name ||!req.body.lastname || !req.body.password || !req.body.email|| !req.body.login ) {
        res.json({success: false, msg: 'Missing field.'});
    } else{
        var role="agent_role";
        var newAgent = new Agent({
            'matricule': req.body.matricule,
            'User.name': req.body.name,
            'User.lastname': req.body.lastname,
            'User.password': req.body.password,
            'User.email': req.body.email,
            'User.login': req.body.login,
            'User.role': role           
        });
        console.log(newAgent);
        // save the user
        newAgent.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

// get all agent
apiAgent.get('/all', function(req, res) {
    Agent.find({'User.role':'agent_role'}, function(err, agents) {
        if (err) throw err;

        if (!agents) {
            res.send({success: false, msg: 'fail to load all agents.'});
        } 
        else {
            res.json({success: true, agents: agents});  
        }

    });
});

//get one agent
apiAgent.get('/get/:id', function(req, res) {
    Agent.findById(req.params.id, function(err, agent) {
        if (err) throw err;

        if (!agent) {
            res.send({success: false, msg: 'fail to load agent.'});
        } 
        else {
            res.json({success: true, agent: agent});  
        }

    });
});

// update one agent
apiAgent.put('/update/:id',bodyParser,function (req,res,next) {
        var newAgent = req.body;
        console.log(newAgent);
        delete newAgent._id;
        Agent.findByIdAndUpdate( req.params.id,newAgent,{new: true},function (err,agent) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update Agent Successful ",agent:agent});
            }

        });

});

// delete on agent
apiAgent.delete('/remove/:id',function (req,res,next) {

        Agent.findByIdAndRemove(req.params.id, function (err,agent) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete agent Successful "+agent._id});
            }

        });

});




module.exports = apiAgent;