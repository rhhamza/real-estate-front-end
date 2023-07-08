import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { Conversation } from '../models/conversation.model';
import { UserEntity } from '../models/user-entity.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private baseUrl = 'http://localhost:8089/Realstate/conversations'; 

  constructor(private http: HttpClient, private websocketService: WebSocketService) {
  }
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/`);
  }

  createConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.baseUrl}`, conversation);
  }

  getConversationsByUser(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/${userId}`);
  }

  addParticipant(conversationId: number, user: UserEntity): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.baseUrl}/${conversationId}`, user);
  }

  updateConversation(conversationId: number, message: Message): Observable<Conversation> {
    return this.http.put<Conversation>(`${this.baseUrl}/${conversationId}`, message);
  }

  getConversationById(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.baseUrl}/${conversationId}`);
  }

  getConversationByParticipantName(firstName: string, lastName: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.baseUrl}/${firstName}/${lastName}`);
  }

  getConversationByUserFirstNameOrLastName(firstname: string, lastname: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.baseUrl}/search?name=${name}`);
  }

  sendMessage(message: string): void {
    this.websocketService.sendMessage({ type: 'chat', message });
  }
}
