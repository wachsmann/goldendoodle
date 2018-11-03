var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({  
	id: String,
	name: { type: String, required: true},
	parent:{type:String,default:null},
	stock:{_id: mongoose.Schema.ObjectId,name:String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	
});
mongoose.model('category', CategorySchema);

module.exports =  mongoose.model('category');