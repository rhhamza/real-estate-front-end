import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Appointment } from '../models/Appointment.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.backEndApi + '/Appointment';

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get(`${this.apiUrl}/all`) as Observable<Appointment[]>;
  }

  getAppointment(idAppointment: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${idAppointment}`);
  }

  deleteAppointment(idAppointment: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idAppointment}`);
  }
  

  updateAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment | any> {
    return this.http.put(`${this.apiUrl}/update/${idAppointment}`, appointment);
  }

  createAppointment(appointment: any): Observable<Appointment | any> {
    return this.http.post(`${this.apiUrl}`, appointment);
  }
}