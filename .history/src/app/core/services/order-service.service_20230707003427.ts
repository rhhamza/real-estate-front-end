import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order.model';
import { of } from 'rxjs';
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

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError<Order[]>('getAllOrders', []))
    );
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

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteOrder'))
    );
  }

  // Uncomment the following methods if needed

  // acceptOrder(id: number): Observable<Order> {
  //   return this.http.put<Order>(`${this.apiUrl}/accept/${id}`, {}).pipe(
  //     catchError(this.handleError<Order>('acceptOrder'))
  //   );
  // }

  // rejectOrder(id: number): Observable<Order> {
  //   return this.http.put<Order>(`${this.apiUrl}/reject/${id}`, {}).pipe(
  //     catchError(this.handleError<Order>('rejectOrder'))
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Handle the error here (e.g., log, show error message, etc.)
      // You can also return a specific error result by modifying the 'result' variable
      return of(result as T);
    };
  }
}
