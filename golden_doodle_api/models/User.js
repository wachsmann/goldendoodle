// create a schema

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  stocks: { type: Array},
  token:{type:String}
},{strict:false});

mongoose.model('user', userSchema);

module.exports =  mongoose.model('user');