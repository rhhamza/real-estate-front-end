import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BadWords } from "../models/bad-words.model";

@Injectable({
  providedIn: "root",
})
export class BadWordsService {
  private apiUrl = "http://localhost:8089/Realstate/badwords"; // Adjust the API URL as per your backend endpoint

  constructor(private http: HttpClient) {}

  getBadWordsById(id: number): Observable<BadWords> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BadWords>(url);
  }

  getAllBadWords(): Observable<BadWords[]> {
    return this.http.get<BadWords[]>(this.apiUrl);
  }

  createBadWords(badWords: BadWords): Observable<BadWords> {
    return this.http.post<BadWords>(this.apiUrl, badWords);
  }

  updateBadWords(id: number, badWords: BadWords): Observable<BadWords> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<BadWords>(url, badWords);
  }

  deleteBadWords(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
