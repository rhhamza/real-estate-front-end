import { IAppointment } from "../interfaces/AppointmentInterface";
import { UserEntity } from "./user-entity.model";

export interface Appointment {
    idAppointment: number;
    title: string;
    discrition: string;
    dateDebut: string; // Assuming date format is ISO 8601 string (e.g., "2023-05-28T10:30:00")
    dateFin: string; // Assuming date format is ISO 8601 string (e.g., "2023-05-28T12:00:00")
    meetingLink: string;
    online: boolean;
    createdAt: string; // Assuming date format is ISO 8601 string (e.g., "2023-05-28T09:00:00")
    updatedAt: string; // Assuming date format is ISO 8601 string (e.g., "2023-05-28T09:30:00")
    user: UserEntity;
    company: Company;
    propertyOffer: PropertyOffer;
  }
  
  export interface User {
    // Define the properties of the User entity here
  }
  
  export interface Company {
    // Define the properties of the Company entity here
  }
  
  export interface PropertyOffer {
    // Define the properties of the PropertyOffer entity here
  }
  export class Appointment implements IAppointment {
    constructor(
      public idAppointment: number,
      public title: string,
      public discrition: string,
      public dateDebut: string,
      public dateFin: string,
      public meetingLink: string,
      public online: boolean,
      public createdAt: string,
      public updatedAt: string
    ) {}
  }