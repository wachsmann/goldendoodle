var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/lmd?authSource=admin', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//Get the default connection
var _mongoose = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
_mongoose.on('error', console.error.bind(console, 'MongoDB connection error:'));
