import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { observable,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = io('http://localhost:3000');
  groupname: any;

  constructor(private http:HttpClient) { }
  joinRoom(data){
    console.log(data);
    this.socket.emit('join',data);
  }
  sendMessage(data){
    this.socket.emit('message',data);
  }
  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  typing(data) {
    this.socket.emit('typing', data);
  }
  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

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
}
