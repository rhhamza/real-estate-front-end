import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PublicationComment } from "../models/publication-comment.model";

@Injectable({
  providedIn: "root",
})
export class PublicationCommentService {
  private apiUrl = "http://localhost:8089/Realstate/publicationComments"; // Adjust the API URL as per your backend endpoint

  constructor(private http: HttpClient) {}

  getCommentById(id: number): Observable<PublicationComment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PublicationComment>(url);
  }

  getAllComments(): Observable<PublicationComment[]> {
    const url = `${this.apiUrl}/`;
    return this.http.get<PublicationComment[]>(url);
  }

  createComment(
    comment: PublicationComment,
    idUser: number,
    idPublication: number
  ): Observable<PublicationComment> {
    const url = `${this.apiUrl}/add/${idUser}/${idPublication}`;
    return this.http.post<PublicationComment>(url, comment);
  }

  updateComment(
    id: number,
    comment: PublicationComment
  ): Observable<PublicationComment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PublicationComment>(url, comment);
  }

  deleteComment(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
