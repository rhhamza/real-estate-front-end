import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'http://localhost:8089/Realstate/attachments'; 

  constructor(private http: HttpClient, private websocketService: WebSocketService) {
  }

  uploadImage(file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('attachment', file);

    return this.http.post<void>(`${this.baseUrl}/upload`, formData);
  }

  downloadImage(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders().append('Accept', 'image/png');
    return this.http.get(`${this.baseUrl}/download/${fileName}`, {
      headers: headers,
      responseType: 'blob'
    });
  }

  receiveAttachment(): Observable<any> {
    return this.websocketService.receiveMessage();
  }

  sendAttachmentThroughWebSocket(file: File): void {
    this.websocketService.sendMessage(file);
  }
}
