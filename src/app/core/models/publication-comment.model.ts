import { UserEntity } from "./user-entity.model";
import { Publication } from "./publication.model";

export class PublicationComment {
  id?: number;
  content?: string;
  user?: UserEntity;
  publication?: Publication;
  createdAt?: Date;
  updatedAt?: Date;
}
