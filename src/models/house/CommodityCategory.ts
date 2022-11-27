import { convertDate } from "../../datas/helper";

export default class CommodityCategory implements ICommodityCategory {

    id: number;
    name: string;
    french: string;
    english: string;
    reference: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.french = data.french;
        this.english = data.english;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.reference = data.reference;
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

}

export interface ICommodityCategory {
    id: number;
    name: string;
    french: string;
    english: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    getParsedDate: (date: string) => string;
}