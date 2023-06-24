import { UserEntity } from "./user-entity.model";

export class Report {
  ID?: number;
  lib?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userEntity: UserEntity;

  constructor() {
    this.userEntity = new UserEntity();
  }
}
