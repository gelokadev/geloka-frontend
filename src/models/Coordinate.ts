
export default class Coordinate implements ICoordinate {

    longitude: number;
    latitude: number;
    address: string;

    constructor(data: any) {
        this.longitude = data.longitude;
        this.latitude = data.latitude;
        this.address = data.address;
    }
}

export interface ICoordinate {
    longitude: number;
    latitude: number;
    address: string;
}