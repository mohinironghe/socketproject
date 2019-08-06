const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket = require('socket.io');
const port = 3000;
var User = require('./models/user');
var chatRooms = require('./models/chatroom');
var groupRooms = require('./models/groupChat');

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/group-chat');
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));

const server = app.listen(port, () => {
    console.log("Server started on port " + port + "...");
});
const io = socket.listen(server);
var msg;
io.on('connection',(socket)=>{
console.log('private chat user connected');

socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected');
})
    //join event
    socket.on('join', (data) =>{
        console.log(data);
        socket.join(data.room);
        console.log(data.room);
        let room = data.room;
        var reversed = reverseString(room);
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
      
       
        console.log(reversed);
        chatRooms.find({},function(err, rooms){
            if(err){
                console.log(err);
                return false;
            }
            count = 0;
            rooms.forEach((room) => {
                if(room.name == data.room || room.name == reversed){
                    count++;
                }
            });
            if(count == 0){
                var chatroom = new chatRooms({
                    name: data.room,
                    messages: [],
                    
                });
                chatroom.save(function(err,doc){
                    if(err) throw err;
                  });
            }
        });
    });

    socket.on('message',(data)=>{
        console.log(data);
        io.in(data.room).emit('new message',{user:data.user,message:data.message});
        chatRooms.update({name:data.room},{ $push:{messages:{user:data.user,message:data.message}}},function(err,doc){
       if(err) throw err;
       console.log(doc.body);
       
        });
    });
    socket.on('typing', (data) => {
        // Broadcasting to all the users except the one typing 
        socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
    });

})
io.on('connection',(socket2)=>{
    console.log('group user connected');
    socket2.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('user disconnected');
    })
socket2.on('joinGroup', (data2) =>{
    console.log(`join  ${data2.creater},${data2.room}`);
    socket2.join(data2.room);

    groupRooms.find({},function(err, rooms){
       if (err) throw err;
       count = 0;
       rooms.forEach(room =>{
           if(room.Groupname == data2.room){
               count++;
          
           }
       });
       if(count !== 0){
               mes = "group already created";
               console.log(mes);
                return mes;
       }else{
        var groupchat = new groupRooms({
            Groupname:data2.room,
            Creator:data2.creater,
            messages: null,
            
        });
        groupchat.save(function(err,doc){
            if (err) throw err;
            // console.log(doc);
        })
       }
    })
   console.log('room join');
 
    
});
socket2.on('groupmessage',(data)=>{
    console.log(data);
    io.in(data.room).emit('new group message',{user:data.user,message:data.message});
    groupRooms.update({Groupname:data.room},{ $push:{messages:{user:data.user,message:data.message}}},function(err,doc){
   if(err) throw err;
//    console.log(doc);
   
    });
});
});

app.post('/users', function(req, res, next) {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
      creation_dt:Date.now()
  });
  let count = 0;
  User.find({},function(err,Users) {
      if(err){
          console.log(err);
          return res.status(500).send(err);
      }
      for(let i = 0; i < Users.length;i++){
          if(Users[i].username == user.username)
          count++;
      }
       // Add user if not already signed up
       if(count == 0){
        user.save(function(err,doc){
            if(err) throw err;
            return res.status(201).send(doc);
          });
          }else{
            return res.status(201).send({user_already_signed_up: true});
          }
  });
 

});
app.post('/login', (req,res) => {
    let isPresent = false;
    let correctPassword = false;
    let loggedInUser;
    User.find({},function(err,users){
        if(err) return res.send(err);
        users.forEach((user) => {
            if((user.username == req.body.username)){
                if(user.password == req.body.password){
                    isPresent = true;
                    correctPassword = true;
                    loggedInUser = {
                        username: user.username,
                        email:user.email
                    }

                }else{
                    isPresent = true;
                }
            }
        });
        return res.status(201).send({ isPresent: isPresent, correctPassword: correctPassword, user: loggedInUser });

    })

  });
  // Route for getting all the users
app.get('/user', (req, res, next) => {
    User.find({}, {username: 1, email: 1, _id: 0},(err, users) => {
        if(err) {
            res.send(err);
        }
        res.send(users);
    });
});
  app.get('/chatroom/:room',(req,res,next) =>{
      let room = req.params.room;
      console.log(room);
      chatRooms.find({name: room},(err, chatroom) => {
        if(err) {
            // console.log(err);
            res.send({message:'No chat Avaliable'});
        }
        res.send(chatroom[0].messages);
    });
  });

  app.post('/createGroup',(req,res,next) =>{
      console.log(req);
      console.log(req.body.groupname);
    //   console.log(req.body.data);
    groupRooms.find({},function(err,Users) {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }else{
       Users.forEach(user =>{
        if(user.Groupname === req.body.groupname){
            isPresent = true;
        }
        else{
            isPresent = false;
        }
        

       });
       return res.status(201).send({isPresent});
    }
 });
 });
 app.get('/groupchatroom/:room',(req,res,next) =>{
    let room = req.params.room;
    console.log(room);
    groupRooms.find({Groupname:room},(err, chatroom) => {
      if(err) {
          // console.log(err);
          res.send({message:'No chat Avaliable'});
      }
      console.log(chatroom[0].messages);
      res.send(chatroom[0].messages);
  });
});
 app.get('/getgroups', (req, res, next) => {
    groupRooms.find({},(err, groups) => {
        if(err) {
            return res.status(500).send(err);
        }
        
        return res.status(201).send(groups);
    });
});

app.get('/', (req, res, next) => {
    res.send('Welcome to the express server...');
});