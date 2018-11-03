var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({  
	name:{ type: String,required:true},
	created_at: { type: Date, default: Date.now },
	id_item:mongoose.Schema.ObjectId,
	qtt:{type:Number,default:0},
	category:mongoose.Schema.ObjectId,
	unity_measure:mongoose.Schema.ObjectId,
	user:{_id: mongoose.Schema.ObjectId,name:String},
});	
mongoose.model('item_story', ItemSchema);

module.exports =  mongoose.model('item_story');