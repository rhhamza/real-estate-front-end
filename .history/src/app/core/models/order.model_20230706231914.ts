import { IOrder } from "../interfaces/order";
import { Company } from "./company.model";
import { StatusType } from "./user-entity.model";

export class Order {
    id?: string;
    startDate?: string;
    endDate: string;
    status?: string;
    price: string;
    company?: Company;
  
  constructor (data: IOrder) {
    this.id = data.id 
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.status = data.status 
    this.price = data.price
    this.company = data.company
    
  } }