import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Conversation } from '../core/models/conversation.model';
import { Message } from '../core/models/message.model';
import { ConversationService } from '../core/services/conversation.service';
import { UserService } from '../core/services/user.service';
import { WebSocketService } from '../core/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  chatObj?: Conversation ;
  messageObj?: Message ;
  messageList: any = [];
  chatList: any = [];
  replymessage: string = '';
  chatData: any;
  chatId: any;
  firstname?: string;
  lastname?: string;
  loggedInUser?: string | null;

  constructor(
    private chatService: ConversationService,
    private router: Router,
    private userService: UserService,
    private websocketService: WebSocketService
  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loggedInUser = sessionStorage.getItem('username');
    this.loadChatList();
    this.initializeWebSocket();
  }

  loadChatList() {
    this.chatService.getConversationByUserFirstNameOrLastName(this.loggedInUser!).subscribe(data => {
      this.chatData = data;
      this.chatList = this.chatData;
    });
  }

  initializeWebSocket() {
    this.websocketService.connect();

    this.websocketService.receiveMessage().subscribe((message) => {
      if (this.chatId && message.chatId === this.chatId) {
        this.messageList.push(message);
      }
    });
  }

  loadChatByEmail(userEmail: string) {
    this.chatService.getConversationByParticipantName(this.loggedInUser!, userEmail).subscribe(data => {
      this.chatData = data;
      this.chatId = this.chatData[0].chatId;
      sessionStorage.setItem('chatId', this.chatId);

      this.chatService.getConversationById(this.chatId).subscribe(data => {
        this.chatData = data;
        this.messageList = this.chatData.messageList;
        this.firstname = this.chatData.firstname;
      });
    });
  }

  sendMessage() {
    this.messageObj!.content = this.chatForm.value.replymessage;
    this.messageObj!.sender!.email! = this.loggedInUser!;
    this.messageObj!.conversation!.id = this.chatId;
    this.websocketService.sendMessage(this.messageObj);
    this.chatForm.reset();
  }

  routeX() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(username: string) {
    this.chatService.getConversationByParticipantName(username, this.loggedInUser!).subscribe(
      (data) => {
        this.chatId = data.id;
        sessionStorage.setItem('chatId', this.chatId);
      },
      (error) => {
        if (error.status == 404) {
          this.messageObj!.sender!.email! = this.loggedInUser!;
          this.chatObj!.participants![0].firstname! = this.loggedInUser!;
          this.chatObj!.participants![0].lastname! = username;
          this.chatService.createConversation(this.chatObj!).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem('chatId', this.chatData.chatId);
            });
        } else {
          // Handle error
        }
      });
  }

}
