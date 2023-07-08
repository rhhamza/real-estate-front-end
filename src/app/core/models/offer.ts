import { IOffer } from "../interfaces/response";

export class Offer {
    id: string;
    title: string;
    reference: string;
    description: string;
    type: string;
    category: string;
    price: string;
    sqm: string;
    picture: string;
    location: string
    bedrooms: number;
    bathrooms: number

    createdAt: string;
    updatedAt: string;

    constructor(data: IOffer) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description
        this.reference = data.reference;
        this.type = data.type;
        this.category = data.category
        this.picture = data.picture
        this.price = data.price;
        this.sqm = data.sqm;
        this.location = data.location;
        this.bedrooms = data.bedrooms;
        this.bathrooms = data.bathrooms;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt
    }
}