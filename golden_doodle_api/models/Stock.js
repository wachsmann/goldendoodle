var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({  
	id: String,
	name: { type: String, required: true},
});
mongoose.model('stock', StockSchema);

module.exports =  mongoose.model('stock');