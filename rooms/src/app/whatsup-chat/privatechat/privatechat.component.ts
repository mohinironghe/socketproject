import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../websocket.service';

@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivatechatComponent implements OnInit {

  message: any;
  user: any;
  messageArray;
  chatroom: any;
  currentUser: any;
  users: Object;
  private isTyping = false;

  constructor(private userService:UserService, private route:ActivatedRoute,private webSocketService:WebsocketService 
  ) {this.webSocketService.newMessageReceived().subscribe(data =>{
    this.messageArray.push(data);
    this.isTyping = false;
    this.userService.getFriendList(this.currentUser).subscribe(response =>{
      this.users = response;
    })
  });
  this.webSocketService.receivedTyping().subscribe(bool => {
    this.isTyping = bool.isTyping;
  });}

  ngOnInit() {
    this.currentUser= this.route.snapshot.paramMap.get('name');
    this.userService.getFriendList(this.currentUser).subscribe(response =>{
      this.users = response;
    })
  }
  getChat(userName){
    this.user = userName;
    if (this.currentUser < userName) {
      this.chatroom = userName.concat(this.currentUser);
    } else{
      this.chatroom = this.currentUser.concat(userName);
     
    }
    this.webSocketService.joinRoom({user: this.currentUser,room:this.chatroom});
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages =>{
      this.messageArray = messages;
    });
  }
  sendMessage() {
    this.webSocketService.sendMessage({room: this.chatroom, user: this.user, message: this.message,sender:this.currentUser});
    this.message = '';
    // this.userService.getChatRoomsChat(this.chatroom).subscribe(messages =>{
    //   console.log(messages);
    //   this.messageArray = messages;
    //   console.log(this.messageArray);
    // });
  }
  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.currentUser});
  }

}
