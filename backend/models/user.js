var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type:String, required:true},
    username: {type:String, required:true},
    password:{type:String, required:true},
    creation_dt:{type:Date}
});
module.exports = mongoose.model('User',schema);
