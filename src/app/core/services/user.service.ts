import { ResetPassword } from './../models/ResetPassword.model';
import { Injectable } from '@angular/core';
import { UserEntity } from '../models/user-entity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserEntity } from '../interfaces/user.interface';
import { UserLogin } from '../models/login.model';
import { AuthResponseDto } from '../models/AuthResponseDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.backEndApi + "/api/auth";


  constructor(private http: HttpClient) { }

  registerUser(user: IUserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/registerclient`, user);
  }

  activeUser(id: number): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/activeAccount?id=${id}`, null);
  }
  

  login(loginDto: UserLogin): Observable<AuthResponseDto> {
    return this.http.post(`${this.apiUrl}/login`, loginDto) as Observable<AuthResponseDto>;
  }
 
  resetPassword(email: string): Observable<string> {
    const resetPasswordData: ResetPassword = { email: email };
    return this.http.post<string>(`${this.apiUrl}/reset-password`, resetPasswordData); 
  }

  isAuthenticated (): boolean {
    let userId = localStorage.getItem('userId') || null
    if (userId) return true;
    return false;
  }
}
