
var CryptoJS = require("crypto-js");

var config = require('../config');

module.exports = {
	
	"encrypt": function encrypt(value){
		let cypher = CryptoJS.AES.encrypt(value.toString(), config.secret);
		return cypher.toString();
	},

	"decrypt": function decrypt(value){
		var bytes  = CryptoJS.AES.decrypt(value.toString(), config.secret);
		return bytes.toString(CryptoJS.enc.Utf8);
	}
};