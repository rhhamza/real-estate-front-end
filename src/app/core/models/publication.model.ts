import { UserEntity } from "./user-entity.model";
import { PublicationComment } from "./publication-comment.model";
import { PublicationReaction } from "./publication-reaction.model";

export class Publication {
  id?: number;
  title?: string;
  content?: string;
  user?: UserEntity;
  comments?: PublicationComment[];
  reactions?: PublicationReaction[];
  createdAt?: Date;
  updatedAt?: Date;
}
