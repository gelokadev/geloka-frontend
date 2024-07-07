
export default class City implements ICity {

    id: string;
    name: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
    }

}

export interface ICity {
    id: string;
    name: string;
}