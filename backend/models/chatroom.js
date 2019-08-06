var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type:String},
    username: {type:String},
    messages:{type:Array},
});
module.exports = mongoose.model('chatRooms',schema);