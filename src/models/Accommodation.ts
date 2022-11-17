enum ACCOMMATION_TYPE {
    TYPE = "TYPE",
    CATEGORY = "CATEGORY",
    LOCATION = "LOCATION",
}

export default class Accommodation implements IAccommodation {
    id: number;
    name: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    type: ACCOMMATION_TYPE

    constructor(data: any) {
        this.createdAt = data.createdAt;
        this.id = data.id;
        this.updatedAt = data.updatedAt;
        this.type = data.type;
        this.name = data.name;
        this.reference = data.reference;
    }

}

export interface IAccommodation {
    id: number;
    name: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    type: ACCOMMATION_TYPE;
}