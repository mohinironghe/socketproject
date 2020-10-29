import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  saveUser(user) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users', user);
  }

  login(user) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/login', user);
  }
  addFriend(user) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/addFriend', user);
  }
  getFriendList(userName) {
    return this.http.get('http://localhost:3000/getFriendList/' + userName);
  }
  
 

  loggedIn() {
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = localStorage.getItem('user');
    return user != null ? true : false;
  }

  getLoggedInUser() {
    // return JSON.parse(localStorage.getItem('user'));
   return localStorage.getItem('user');
  }

  getUsers() {
    return this.http.get('http://localhost:3000/user');
  }

  getChatRoomsChat(chatRoom) {
    return this.http.get('http://localhost:3000/chatroom/' + chatRoom);
  }
  getGroup(){
    return this.http.get('http://localhost:3000/getgroups');
  }
  
}
