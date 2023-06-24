import { Publication } from "./publication.model";
import { PublicationComment } from "./publication-comment.model";
import { PublicationReaction } from "./publication-reaction.model";
import { Report } from "./report.model";
import { Roles } from "./roles.model";

export enum StatusType {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class UserEntity {
  ID?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: StatusType;
  email?: string;
  password?: string;
  roles?: Roles[];
  createdAt?: Date;
  updatedAt?: Date;
  publications: Publication[];
  comments: PublicationComment[];
  reacts: PublicationReaction[];
  reports: Report[];

  constructor() {
    this.roles = [];
    this.publications = [];
    this.comments = [];
    this.reacts = [];
    this.reports = [];
  }
}
