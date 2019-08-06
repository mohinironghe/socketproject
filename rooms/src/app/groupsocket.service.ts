import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { observable,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GroupsocketService {
  private socket = io('http://localhost:3000');
  groupname: any;
  constructor(private http:HttpClient) { }

  joinGroupRoom(data){
    console.log(data);
    this.socket.emit('joinGroup',data);
    // return this.http.post('http://localhost:3000/createGroup' , data);

  }
  validateGroupName(data){
    console.log(data);
    this.groupname = data;
    return this.http.post('http://localhost:3000/createGroup' ,{groupname:this.groupname});
  }
  sendGroupMessage(data){
    console.log(data);
    this.socket.emit('groupmessage' , data);
  }
  
  getGroupChatRoomsChat(chatRoom) {
    return this.http.get('http://localhost:3000/groupchatroom/' + chatRoom);
  }
  newGroupMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new group message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  LogOut(){
    this.socket.on('disconnect');
    
  }
}
