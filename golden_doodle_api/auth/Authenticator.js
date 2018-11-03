var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../models/User');
module.exports = {

	validateToken: function validateToken(req,res,callback){
		
		var token = req.headers['x-access-token'];
	    if (!token)	
	    	return res.status(401).send({
	            message: 'No token provided.'
	        });

	    jwt.verify(token, config.secret, function(err, decoded) {

	        
	        if (err)
	        	return res.status(401).send({
			            message: 'Failed to authenticate token.'
			        });
		    
		    User.findById(decoded.id, function(err, obj) {
	            
	            if (err) return res.status(401).send({ "message": "There was a problem finding the user."});

	            if (!obj) return res.status(404).send({ "message": "No user found."});

	            decoded.stocks = obj.stocks;
	            
	            callback(res,decoded);
	        });

	    });
	}
}