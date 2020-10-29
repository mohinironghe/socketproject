var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Groupname:{type:String},
    Creator:{type:String},
    messages:[{
        user:{
            type:String
        },
        message:{
            type:String
        }
    }]
})

module.exports = mongoose.model('groupChat',schema);