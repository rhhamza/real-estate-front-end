import { UserEntity } from "./user-entity.model";
import { Publication } from "./publication.model";

export enum ReactionType {
  LIKE = "Like",
  LOVE = "Dislike",
  HAHA = "Heart",
}

export class PublicationReaction {
  id: number;
  reaction?: ReactionType;
  user?: UserEntity;
  publication?: Publication;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;

  constructor(
    id: number,
    reaction?: ReactionType,
    user?: UserEntity,
    publication?: Publication,
    createdAt?: Date,
    updatedAt?: Date,
    userId?: number
  ) {
    this.id = id;
    this.reaction = reaction;
    this.user = user;
    this.publication = publication;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}
