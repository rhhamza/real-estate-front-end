import { ICompany } from "../interfaces/company";
import { StatusType } from "./user-entity.model";

export class Company {
  id?: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  logo?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  
  constructor (data: ICompany) {
  
    this.name = data.name
    this.address = data.address
    this.description = data.description
    this.phone = data.phone 
    this.email = data.email
    //this.logo = data.logo
    this.status = data.status
    //this.createdAt = data.createdAt 
    //this.updatedAt = data.updatedAt
  } 
}
