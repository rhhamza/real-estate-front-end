import { Injectable } from '@angular/core';
import { UserEntity } from '../models/user-entity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserEntity } from '../interfaces/user.interface';
import { UserLogin } from '../models/login.model';
import { AuthResponseDto } from '../models/AuthResponseDto .model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8089/Realstate/api/auth";



  constructor(private http: HttpClient) { }

  registerUser(user: IUserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/registerclient`, user);
  }

  activeUser(id: number): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/activeAccount?id=${id}`, null);
  }
  

  login(loginDto: UserLogin): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, loginDto);
  }
}
