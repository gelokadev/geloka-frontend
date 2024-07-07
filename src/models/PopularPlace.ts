import { convertDate, getFilePath } from "../datas/helper";
import Coordinate from "./Coordinate";


enum TYPE {
    CITY = "CITY"
}

export default class PopularPlace implements IPopularPlace {

    id: string;
    name: string;
    description: string;
    image?: string;
    radius: number;
    coordinate: Coordinate;
    status: boolean;
    createdAt: string;
    cityId: number;
    country: string;
    type: TYPE;


    constructor(data: any) {
        this.id = data.reference;
        this.name = data.name;
        this.description = data.description;
        this.radius = data.radius;
        this.coordinate = new Coordinate(data.position);
        this.image = getFilePath(data.image);
        this.createdAt = data.createdAt;
        this.type = data.type;
        this.cityId = data.cityId;
        this.status = data.status;
        this.country = data.country;
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

}

export interface IPopularPlace {
    id: string;
    name: string;
    description: string;
    status: boolean;
    image?: string;
    radius: number;
    coordinate: Coordinate;
    type: TYPE;
    cityId?: number;
    country?: string;
    getParsedDate: (date: string) => string;
}