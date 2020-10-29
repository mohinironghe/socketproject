import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WhatsupChatRoutingModule} from './whatsup-chat-routing.module';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [PrivatechatComponent],
  imports: [
    CommonModule,
    FormsModule,
    WhatsupChatRoutingModule
  ]
})
export class WhatsupChatModule { }
