
export default class Country implements ICountry {

    id: string;
    name: string;
    iso: string;


    constructor(data: any) {
        this.id = data.iso2;
        this.name = data.name;
        this.iso = data.iso2;
    }

}

export interface ICountry {
    id: string;
    name: string;
    iso: string;
}