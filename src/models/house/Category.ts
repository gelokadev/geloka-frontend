import { convertDate } from "../../datas/helper";

export default class HouseCategory implements IHouseCategory {

    id: number;
    title: string;
    icon: string;
    image: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    description: string;


    constructor(data: any) {
        this.id = data.id;
        this.image = data.image;
        this.title = data.title;
        this.icon = data.icon;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.reference = data.reference;
        this.description = data.description;
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

}

export interface IHouseCategory {
    id: number;
    icon: string;
    title: string;
    image: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    getParsedDate: (date: string) => string;
}