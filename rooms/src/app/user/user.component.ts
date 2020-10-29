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
  selectedValue: any;
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
      this.users = response;
    })
  }
  roomName(name){
    this.username = name;
    //check which string is less than it check charecter by charecter
    if (this.currentUser < this.username) {
      this.chatroom = this.username.concat(this.currentUser);
    } else{
      this.chatroom = this.currentUser.concat(this.username);
    }
  
    // this.webSocketService.joinRoom({user: this.currentUser,room:this.chatroom});
    this.router.navigate(['/chatroom',this.currentUser,this.chatroom ]);
  
  }
  addFriend(){
    this.userService.addFriend({id:this.currentUser,friendId:this.selectedValue._id,userName:this.selectedValue.username}).subscribe((res)=>{
    })
  }
  privatChat(){
    this.isShow = !this.isShow;
  }
  groupChat(){
    this.showGroup = !this.showGroup;
    this.userService.getGroup().subscribe(res =>{
      this.Groups = res;
    })
  }
  groupRoomName(event){
    this.joinGroup = event;
    // this.currentUser= this.route.snapshot.paramMap.get('name');
    this.router.navigate(['/groupchatroom',this.currentUser,this.joinGroup ]);

  }
  WhatsAppChat(){
    this.router.navigate(['/whatsup/users',this.currentUser]);

  }
  createGroup(){
    this.create = !this.create;
  }
  Group(){
    this.currentUser= this.route.snapshot.paramMap.get('name');
    this.webSocketService.validateGroupName({creater: this.currentUser,groupname:this.groupname}).subscribe(Response =>{
     this.resValue = Response;
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
