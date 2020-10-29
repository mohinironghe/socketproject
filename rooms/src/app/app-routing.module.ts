import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { UserComponent } from './user/user.component';
import { GroupchatroomComponent } from './groupchatroom/groupchatroom.component';

const routes: Routes = [
  {path: '', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'chatroom/:user/:room', component: ChatroomComponent},
  {path: 'groupchatroom/:user/:room', component: GroupchatroomComponent},
  {path: 'user/:name', component: UserComponent},
  {
    path:'whatsup',loadChildren:'./whatsup-chat/whatsup-chat.module#WhatsupChatModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
