
var express = require('express'),
	app = express(),
	db = require('./db'),
	authenticator = require('./auth/Authenticator'),
	cors = require('cors');

app.use(cors()); // Use this after the variable declaration

app.all('/app/*', function (req, res, next) {
	
	authenticator.validateToken(req,res,function(res,decoded){
    	req.decoded = decoded;
		next() // pass control to the next handler

	});
});

app.use('/auth', require('./auth/AuthController'));

app.use('/app/items',require('./controllers/ItemController'));

app.use('/app/categories',require('./controllers/CategoryController'));
app.use('/app/unities',require('./controllers/UnityMeasureController'));
app.use('/app/stocks',require('./controllers/StockController'));
app.use('/app/users',require('./controllers/UserController'));

module.exports = app;

