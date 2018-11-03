var mongoose = require('mongoose');

var UnityMeasureSchema = new mongoose.Schema({  
	name:{ type: String,required:true},

});	
mongoose.model('unity_measure', UnityMeasureSchema);

module.exports =  mongoose.model('unity_measure');