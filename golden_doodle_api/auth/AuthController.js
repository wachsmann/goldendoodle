// AuthController.js
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),

    User = require('../models/User'),

    jwt = require('jsonwebtoken'),
    hasher = require('../utils/hasher'),
    config = require('../config'),
    authenticator = require("./Authenticator");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());



router.post('/login', function(req, res) {


    User.findOne({
            name: req.body.name,
            password:hasher.createHash(req.body.password)
        },

        function(err, obj) {
            if (err) return res.status(500).send("There was a problem registering the user.")
                
            // create a token
            if (obj) {

                var token = jwt.sign({
                    id: obj._id,
                    name:obj.name,
                }, config.secret 
                /*{
                    expiresIn: 604800 // expires in 24 hours
                }
                */
                );
                obj.token = token;
                res.status(200).send(obj);

            } else {
                res.status(406).send({

                    message: "User don't match!"
                    
                });
            }

        });

});

router.get('/', function(req, res) {
    
    authenticator.validateToken(req,res,function(res,decoded){

        res.status(200).send({
            "message": "Stock App",
            "status": "Connected"
        });
        
    });
    
});

module.exports = router;