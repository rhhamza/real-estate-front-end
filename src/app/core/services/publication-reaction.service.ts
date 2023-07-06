import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PublicationReaction,
  ReactionType,
} from "../models/publication-reaction.model";

@Injectable({
  providedIn: "root",
})
export class PublicationReactionService {
  private baseUrl = "http://localhost:8089/Realstate/publicationReactions"; // Update the base URL according to your API endpoint

  constructor(private http: HttpClient) {}

  getReactionById(id: number): Observable<PublicationReaction> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PublicationReaction>(url);
  }

  getAllReactions(): Observable<PublicationReaction[]> {
    return this.http.get<PublicationReaction[]>(this.baseUrl);
  }

  createReaction(
    reaction: ReactionType,
    idUser: number,
    idPublication: number
  ): Observable<PublicationReaction> {
    const url = `${this.baseUrl}/add/${idUser}/${idPublication}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set the Content-Type header to application/json
    const options = { headers: headers };
    console.log("url", reaction, url);
    return this.http.post<PublicationReaction>(url, {reaction}, options);
  }
  

  updateReaction(
    id: number,
    reaction: ReactionType
  ): Observable<PublicationReaction> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<PublicationReaction>(url, reaction);
  }

  deleteReaction(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getReactionByUserAndPublication(
    userId: number,
    publicationId: number
  ): Observable<PublicationReaction> {
    const url = `${this.baseUrl}/user/${userId}/publication/${publicationId}`;
    return this.http.get<PublicationReaction>(url);
  }
}
