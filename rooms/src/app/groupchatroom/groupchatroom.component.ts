import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsocketService } from './../groupsocket.service';

@Component({
  selector: 'app-groupchatroom',
  templateUrl: './groupchatroom.component.html',
  styleUrls: ['./groupchatroom.component.css']
})
export class GroupchatroomComponent implements OnInit {
  message;
  username;
  chatroom;
  messages;
  response;
  constructor(private route: ActivatedRoute,
   private groupSocket:GroupsocketService,
    private router: Router) {
      this.groupSocket.newGroupMessageReceived().subscribe(data =>{
        this.response.push(data);
        console.log(this.response);
      });
     }

  ngOnInit() {
    this.username =  this.route.snapshot.paramMap.get('user');
    this.chatroom = this.route.snapshot.paramMap.get('room');
  console.log(this.username);
  console.log(this.chatroom);
  this.groupSocket.joinGroupRoom({user: this.username,room:this.chatroom});
  this.groupSocket.getGroupChatRoomsChat(this.chatroom).subscribe(res =>{
   this.response = res;
   console.log(this.response.messages);
   console.log(this.response);
  })
  }
  sendMessage(){
  console.log(this.message);
  this.groupSocket.sendGroupMessage({room:this.chatroom,user:this.username,message:this.message});
  }
  LogOut(){
    this.groupSocket.LogOut();
    this.router.navigate(['user',this.username]);
  }

}
