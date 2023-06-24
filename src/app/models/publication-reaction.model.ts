import { UserEntity } from "./user-entity.model";
import { Publication } from "./publication.model";

export enum ReactionType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

export class PublicationReaction {
  id?: number;
  reaction?: ReactionType;
  user?: UserEntity;
  publication?: Publication;
  createdAt?: Date;
  updatedAt?: Date;
}
