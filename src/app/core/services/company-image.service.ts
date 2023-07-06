import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyImage } from '../models/company-image.model'

@Injectable({
  providedIn: 'root'
})
export class CompanyImageService {

  private baseUrl = 'http://localhost:8091/company-images';

  constructor(private http: HttpClient) { }

  uploadImage(file: File, id: number): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('attachment', file);

    return this.http.post<void>(`${this.baseUrl}/upload/${id}`, formData);
  }

  getImageById(id: string): Observable<CompanyImage> {
    return this.http.get<CompanyImage>(`${this.baseUrl}/${id}`);
  }
}
