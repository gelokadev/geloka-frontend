export default class Commodity implements ICommodity {

    id: number;
    icon: string;
    name: string;
    french: string;
    english: string;
    reference: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.french = data.french;
        this.english = data.english;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.reference = data.reference;
    }

}

export interface ICommodity {
    id: number;
    icon: string;
    name: string;
    french: string;
    english: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
}