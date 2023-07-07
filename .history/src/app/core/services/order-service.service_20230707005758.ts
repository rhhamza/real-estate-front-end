import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order.model';
import { of } from 'rxjs';
import {IOrder} from '../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "http://localhost:8089/Realstate/order"; // Adjust the API URL as per your backend endpoint


  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/add`, order).pipe(
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  addOrderAndAssignToCompany(order: Order, companyId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/addOrder/${companyId}`, order).pipe(
      catchError(this.handleError<Order>('addOrderAndAssignToCompany'))
    );
  }

 
  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/all`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Order>('getOrderById'))
    );
  }

  updateOrder(id: number, updatedOrder: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, updatedOrder).pipe(
      catchError(this.handleError<Order>('updateOrder'))
    );
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteOrder'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Handle the error here (e.g., log, show error message, etc.)
      // You can also return a specific error result by modifying the 'result' variable
      return of(result as T);
    };
  }
}
