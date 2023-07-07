import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private messageSubject$: Subject<any> = new Subject<any>();

  constructor() {
    this.socket$ = webSocket<any>({ url: 'ws://localhost:8089/Realstate/myhandler' });

    this.socket$.subscribe(
      (message) => {
        // Handle the received message
        this.messageSubject$.next(message);
      },
      (error) => {
        // Handle errors
        console.error(error);
      }
    );
  }
  connect(): void {
    this.socket$.next({ action: 'connect' });
  }
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  getMessageSubject(): Subject<any> {
    return this.messageSubject$;
  }
  receiveMessage(): Subject<any> {
    return this.messageSubject$;
  }
}
