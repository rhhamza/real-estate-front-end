import { Company } from "../models/company.model";
import { StatusType } from "../models/user-entity.model";

export interface IOrder {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    company: Company;
}


    
    