var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({  
	name:{ type: String,required:true},
	created_at: { type: Date, default: Date.now },
	updated_at: Date,
	qtt:{type:Number,default:0},
	category:{type:mongoose.Schema.ObjectId,required:true},
	unity_measure:{type:mongoose.Schema.ObjectId,required:true},
});	
mongoose.model('item', ItemSchema);

module.exports =  mongoose.model('item');