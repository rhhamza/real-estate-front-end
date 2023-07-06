export class Offer {
    id: string;
    title: string;
    reference: string;
    type: string;
    category: string;
    price: string;
    sqm: string;
    location: string
    bedrooms: number;
    bathrooms: number

    createdAt: string;
    updatedAt: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.reference = data.reference;
        this.type = data.type;
        this.category = data.category
        this.price = data.price;
        this.sqm = data.sqm;
        this.location = data.location;
        this.bedrooms = data.bedrooms;
        this.bathrooms = data.bathrooms;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt
    }
}