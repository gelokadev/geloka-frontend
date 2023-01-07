import { convertDate, getFilePath } from "../../datas/helper";
import Coordinate from "../Coordinate";
import LessorLite from "../LessorLite";
import HouseCategory from "./Category";

enum ACCESSIBILITY {
    CAR = "CAR",
    FOOT = "FOOT",
    MOTOCYCLE = "MOTOCYCLE",
}

enum PAYMENT_FREQUENCE {
    NIGHTLY = "NIGHTLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export default class House implements IHouse {

    id: number;
    price: number;
    baths: number;
    rooms: number;
    lounges: number;
    kitchens: number;
    isModern: boolean;
    coordinate: Coordinate;
    category: HouseCategory;
    accessibilities: ACCESSIBILITY[];
    stars: number;
    enabled: boolean;
    commentCount: number;
    paymentFrequency: PAYMENT_FREQUENCE;
    title: string;
    image: string|undefined;
    reference: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    lessor: LessorLite | null;
    medias: string[] | null;

    constructor(data: any) {
        this.id = data.id;
        this.price = data.price;
        this.baths = data.baths;
        this.enabled = data.enabled;
        this.rooms = data.rooms;
        this.lounges = data.lounges;
        this.kitchens = data.kitchens;
        this.isModern = data.isModern;
        this.accessibilities = data.accessibilities;
        this.stars = data.stars;
        this.commentCount = data.commentCount;
        this.paymentFrequency = data.paymentFrequency;
        this.title = data.title;
        this.image = getFilePath(data.image);
        this.description = data.description;
        this.coordinate = new Coordinate(data.coordinate);
        this.category = new HouseCategory(data.category);
        this.lessor = data.owner ? new LessorLite(data.owner) : null;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.reference = data.reference;
        this.medias = data.medias ? data.medias.map((m: any) => getFilePath(m.path)): null;
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

    getPriceRange() {
        return this.price + ' XAF / ' + this.getPriceFrequenceLabel();
    }

    getPriceFrequenceLabel() {
        switch (this.paymentFrequency) {
            case PAYMENT_FREQUENCE.DAILY:
                return 'par jour'
            case PAYMENT_FREQUENCE.NIGHTLY:
                return 'par nuit'
            case PAYMENT_FREQUENCE.WEEKLY:
                return 'par semaine';
            case PAYMENT_FREQUENCE.MONTHLY:
                return 'par mois';
            case PAYMENT_FREQUENCE.YEARLY:
                return 'par an';
            default:
                return 'par jour';
        }
    }
}

export interface IHouse {
    id: number;
    price: number;
    baths: number;
    rooms: number;
    lounges: number;
    kitchens: number;
    enabled: boolean;
    isModern: boolean;
    coordinate: Coordinate;
    category: HouseCategory;
    accessibilities: ACCESSIBILITY[];
    stars: number;
    commentCount: number;
    paymentFrequency: PAYMENT_FREQUENCE;
    title: string;
    image: string|undefined;
    reference: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    lessor: LessorLite | null;
    medias: string[] | null;
    getParsedDate: (date: string) => string;
}