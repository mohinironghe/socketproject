var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Groupname:{type:String},
    Creator:{type:String},
    messages:{type:Array}
})

module.exports = mongoose.model('groupChat',schema);