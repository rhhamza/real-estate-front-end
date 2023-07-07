import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../models/publication.model";
import { CommentDTO } from "../models/comment-dto.model";
import { PublicationComment } from "../models/publication-comment.model";
import { UserEntity } from "../models/user-entity.model";
@Injectable({
  providedIn: "root",
})
export class PublicationService {
  private baseUrl = "http://localhost:8089/Realstate/publications";

  constructor(private http: HttpClient) {}

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`);
  }

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.baseUrl}`);
  }

  createPublication(
    publication: Publication,
    userId: string
  ): Observable<Publication> {
    return this.http.post<Publication>(
      `${this.baseUrl}/add/${userId}`,
      publication
    );
  }

  updatePublication(
    id: number,
    publication: Publication
  ): Observable<Publication> {
    return this.http.put<Publication>(`${this.baseUrl}/${id}`, publication);
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUsersByReactionType(
    publicationId: number,
    reactionType: string
  ): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(
      `${this.baseUrl}/${publicationId}/users/${reactionType}`
    );
  }

  getReactionCountByType(
    publicationId: number,
    reactionType: string
  ): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/${publicationId}/reactions/count?reactionType=${reactionType}`
    );
  }

  getAllPublicationComments(
    publicationId: number
  ): Observable<PublicationComment[]> {
    return this.http.get<PublicationComment[]>(
      `${this.baseUrl}/${publicationId}/comments`
    );
  }

  getAllPublicationCommentsWithUser(
    publicationId: number
  ): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(
      `${this.baseUrl}/${publicationId}/commentsWithuser`
    );
  }
}
