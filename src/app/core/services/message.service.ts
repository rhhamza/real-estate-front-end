import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8089/Realstate/messages'; 

  constructor(private http: HttpClient, private websocketService: WebSocketService) {
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/add`, message);
  }

  getMessagesByConversation(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/conversation/${conversationId}`);
  }

  deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${messageId}`);
  }

  receiveMessage(): Observable<Message> {
    return this.websocketService.receiveMessage();
  }

  sendMessageThroughWebSocket(message: Message): void {
    this.websocketService.sendMessage(message);
  }

  getAllmessags():Observable<any>{
    return this.http.get<Message[]>(`${this.baseUrl}/all`);
  }
}
