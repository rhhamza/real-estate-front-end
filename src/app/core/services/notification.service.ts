import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8089/Realstate/notifications'; 

  constructor(private http: HttpClient, private websocketService: WebSocketService) {
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/add`, notification);
  }

  getNotificationsByUser(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`);
  }

  markNotificationAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${notificationId}/read`, {});
  }

  countUnreadNotifications(recipient: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/unread-count?recipient=${recipient}`);
  }

  receiveNotification(): Observable<Notification> {
    return this.websocketService.receiveMessage();
  }

  sendNotificationThroughWebSocket(notification: Notification): void {
    this.websocketService.sendMessage(notification);
  }
}
