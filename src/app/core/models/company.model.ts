import { StatusType } from "./user-entity.model";

export class Company {
  id?: number;
  name?: string;
  address?: string;
  description?: string;
  phone?: number;
  email?: string;
  logo?: string;
  status?: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
