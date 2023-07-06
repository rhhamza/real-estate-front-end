import { StatusType } from "./user-entity.model";

export class Order {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    status?: StatusType;
    price?: number;
  }
  