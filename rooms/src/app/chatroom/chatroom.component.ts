import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { WebsocketService } from './../websocket.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  private username: string;
  private email: String;
  private chatroom;
  private message: String;
  private user:String;
  // messageArray: Array<{user: String, message: String}> = [];
  messageArray ;
  private isTyping = false;
  constructor(private route: ActivatedRoute,
    private webSocketService: WebsocketService,
    private userService: UserService,
    private router: Router) {
      this.webSocketService.newMessageReceived().subscribe(data =>{
        this.messageArray.push(data);
        console.log(this.messageArray);
        this.isTyping = false;
      });
      this.webSocketService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
     }

  ngOnInit() {
    this.user =  this.route.snapshot.paramMap.get('user');
     this.chatroom = this.route.snapshot.paramMap.get('room');
   console.log(this.user);
   console.log(this.chatroom);
    this.webSocketService.joinRoom({user: this.user,room:this.chatroom});
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages =>{
      console.log(messages);
      this.messageArray = messages;
      console.log(this.messageArray);
    });
  }
  sendMessage() {
    console.log(this.user);
   console.log(this.chatroom);
   console.log(this.message);
    this.webSocketService.sendMessage({room: this.chatroom, user: this.user, message: this.message});
    this.message = '';
  }
  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.user});
  }

}
