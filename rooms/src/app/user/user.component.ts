import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebsocketService } from './../websocket.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
users;
username;
chatroom;
isShow :boolean = false;
showGroup:boolean = false;
create:boolean = false;
  currentUser: any;
  groupname;
  resValue;
  Groups;
  joinGroup;
  constructor(private userService: UserService,
    private router: Router,private route:ActivatedRoute,private webSocketService:WebsocketService ) { }

  ngOnInit() {
    this.currentUser= this.route.snapshot.paramMap.get('name');

    this.userService.getUsers().subscribe(response =>{
      console.log(response);
      this.users = response;
      console.log(this.users);
    })
  }
  roomName(name){
    this.username = name;
    console.log(this.username);
    
   
    console.log(this.currentUser);
    if ( this.currentUser < this.username) {
      this.chatroom = this.username.concat(this.currentUser);
      console.log(this.chatroom);
    } else{
      this.chatroom = this.currentUser.concat(this.username);
      console.log(this.chatroom);
    }
  
    // this.webSocketService.joinRoom({user: this.currentUser,room:this.chatroom});
    this.router.navigate(['/chatroom',this.currentUser,this.chatroom ]);
  
  }
  privatChat(){
    this.isShow = !this.isShow;
  }
  groupChat(){
    this.showGroup = !this.showGroup;
    this.userService.getGroup().subscribe(res =>{
      this.Groups = res;
      console.log(this.Groups);
    })
  }
  groupRoomName(event){
    this.joinGroup = event;
    console.log(this.joinGroup);
    // this.currentUser= this.route.snapshot.paramMap.get('name');
    console.log(this.currentUser);
    this.router.navigate(['/groupchatroom',this.currentUser,this.joinGroup ]);

  }
  createGroup(){
    this.create = !this.create;
  }
  Group(){
    this.currentUser= this.route.snapshot.paramMap.get('name');
   console.log(this.groupname);
    console.log(this.currentUser);
    this.webSocketService.validateGroupName(this.groupname).subscribe(Response =>{
     this.resValue = Response;
     console.log(this.resValue);
     if(this.resValue.isPresent === true){
      alert('groupname already taken');
     }else if(this.resValue.isPresent === false){
      this.webSocketService.joinGroupRoom({creater: this.currentUser,room:this.groupname});
      alert('group created successfully');
    }else{
        alert('something went wrong ');
      }
    })
  }


}
