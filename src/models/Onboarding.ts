import { convertDate, getFilePath } from "../datas/helper";

export default class Onboarding implements IOnboarding {

    id: string;
    titleFr: string;
    titleEn: string;
    descriptionFr: string;
    descriptionEn: string;
    image?: string;
    position: number;
    createdAt: string;


    constructor(data: any) {
        this.id = data.reference;
        this.titleFr = data.titleFr;
        this.titleEn = data.titleEn;
        this.descriptionFr = data.descriptionFr;
        this.descriptionEn = data.descriptionEn;
        this.position = data.position;
        this.image = getFilePath(data.image);
        this.createdAt = data.createdAt;
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

}

export interface IOnboarding {
    id: string;
    titleFr: string;
    titleEn: string;
    descriptionFr: string;
    descriptionEn: string;
    image?: string;
    position: number;
    createdAt: string;
    getParsedDate: (date: string) => string;
}