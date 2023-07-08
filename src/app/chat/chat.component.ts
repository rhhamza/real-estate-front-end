import { Conversation } from './../core/models/conversation.model';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../core/models/message.model';
import { ConversationService } from '../core/services/conversation.service';
import { WebSocketService } from '../core/services/web-socket.service';
import { UserEntity } from '../core/models/user-entity.model';
import { MessageService } from '../core/services/message.service';
import { getLocaleDateFormat } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  chatList: Conversation[] = [];
  chatData: Conversation | null = null;
  messageList: Message[] = [];
  replyMessage: string = '';
  loggedInUser: string | null = null;
  userId: number | null = null;
  selectedConversation: Conversation | null = null;
  replyMessageStatus = false;
  replyMessages: string[] = [];
  searchQuery?: string;
  searchResults?: UserEntity[];

  constructor(
    private chatService: ConversationService,
    private router: Router,
    private messageService: MessageService,
    private websocketService: WebSocketService,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem('username');
    this.userId = parseInt(localStorage.getItem('userId') || '0');
    this.loadChatList();
    this.initializeWebSocket();
    console.log(this.userId)
    
  }

  fetchConversations() {
    // Use your conversation service to fetch all conversations
    this.chatService.getConversationsByUser(this.userId!).subscribe(
      (conversations: any[]) => {
        this.chatList = conversations;
      },
      (error) => {
        console.error('Error fetching conversations:', error);
      }
    );
  }



  fetchMessagesById(conversationId: number) {
    // Use your conversation service to fetch messages by conversation ID
    this.messageService.getMessagesByConversation(conversationId).subscribe(
      (messages: any[]) => {
        this.selectedConversation!.messages = messages;
  
        console.log('userId:', this.userId);
        console.log('sender IDs:');
        messages.forEach((message) => {
          console.log(message.sender?.ID);
        });
  
        const filteredMessages = messages.filter((message) => message.sender?.ID === this.userId);
        console.log(filteredMessages, "current messages");
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  loadChatList() {
    this.chatService.getConversationsByUser(this.userId!).subscribe(data => {
      this.chatList = data;
    });
  }

  initializeWebSocket() {
    this.websocketService.connect();

    this.websocketService.receiveMessage().subscribe((message) => {
      if (this.chatData && message.conversation?.id === this.chatData.id) {
        this.messageList.push(message);
      }
    });
  }

  loadChatByEmail(userEmail: string) {
    this.chatService.getConversationByParticipantName(this.loggedInUser!, userEmail).subscribe(data => {
      this.chatData = data;
      this.messageList = this.chatData?.messages || [];

    });
  }

  getUserById(id : number) {

  }

  sendMessage() {
    if (this.selectedConversation) {
      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
      const message: Message = {
        content: this.replyMessage,
        sender: undefined, // Initialize sender as undefined
        conversation: { id: this.selectedConversation.id },
        timestamp: new Date(formattedDate!)
      };
  
      this.userService.getUserById(this.userId!).subscribe(
        (user: UserEntity) => {
          // Assign the retrieved user as the sender
          message.sender = user;
  
          // Send message through WebSocket
          this.messageService.sendMessageThroughWebSocket(message);
          this.replyMessages.push(this.replyMessage)
  
          // Insert the message into the database using HTTP POST
          this.messageService.sendMessage(message).subscribe(
            (response) => {
              // Reset the chat form and clear the reply message
              this.chatForm.reset();
              this.replyMessage = '';
            },
            (error) => {
              // Handle any errors that occur during sending the message or inserting it into the database
              console.error('Error sending or inserting message:', error);
            }
          );
        },
        (error) => {
          console.error('Error retrieving user:', error);
        }
      );
    } else {
      console.log('No conversation selected');
    }
  }
  

  routeX() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(id: number | undefined) {
    if (id !== undefined) {
      this.chatService.getConversationById(id).subscribe(
        (data) => {
          this.chatData = data;
          this.messageList = this.chatData?.messages!;
          console.log(data)
        },
        (error) => {
          if (error.status === 404) {
            const newConversation: Conversation = {
              /*participants: [
                { firstname: this.loggedInUser!, lastname: this.lastName! }
              ]*/
            };
            this.chatService.createConversation(newConversation).subscribe(
              (data) => {
                this.chatData = data;
                this.messageList = this.chatData?.messages!;
              }
            );
          } else {
            // Handle other errors here
          }
        }
      );
    } else {
      // Handle the case where id is undefined
    }
  }
  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.fetchMessagesById(conversation?.id!);
    
  }

  searchUsers() {
    if (this.searchQuery) {
      this.userService.getUsersByName(this.searchQuery)
        .subscribe((users: UserEntity[]) => {
          this.searchResults = users;
        });
    }
  }

  createConversation(user: UserEntity) {
    const conversation: Conversation = {
      participants: [user],
      messages: []
    };

    this.chatService.createConversation(conversation)
      .subscribe((createdConversation: Conversation) => {
        // Handle successful conversation creation
        console.log('Conversation created:', createdConversation);
      });
  }

  // getCurrentMessages(){
  //   this.messageService.getAllmessags().subscribe(
  //     (messages: Message[]) => {
  //       console.log(messages);
  //       const iduser = localStorage.getItem('userId');
  //       const filteredMessages = messages.filter((message) => message.sender?.ID === this.userId );
  //       console.log(filteredMessages);
  //       // Use the filteredMessages as needed
  //     },
  //     (error) => {
  //       console.error('Error fetching messages:', error);
  //     }
  //   );

  // }
  
}
