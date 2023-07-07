import { Roles } from "../models/roles.model";

export interface IUserEntity{
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  status: string;
  email?: string;
  password?: string;

}