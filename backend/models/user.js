var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type:String, required:true},
    username: {type:String, required:true},
    password:{type:String, required:true},
    creation_dt:{type:Date},
    friendList:[{
        userName:{
            type:String
        },
        userId:{
            type:Schema.Types.ObjectId
        },
        lastMessage:{
            type:String
        },
        sendOn:{
            type:Date
        }
    }],
    lastSeen:{type:Date,default:Date.now()}
});
module.exports = mongoose.model('User',schema);
