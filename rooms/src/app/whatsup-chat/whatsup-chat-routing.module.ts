import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivatechatComponent} from './privatechat/privatechat.component'
const routes: Routes = [
      {path: 'users/:name', component:PrivatechatComponent },
//   {path: 'login', component: LoginComponent},
//   {path: 'sign-up', component: SignUpComponent},
//   {path: 'chatroom/:user/:room', component: ChatroomComponent},
//   {path: 'groupchatroom/:user/:room', component: GroupchatroomComponent},
//   {path: 'user/:name', component: UserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsupChatRoutingModule { }
