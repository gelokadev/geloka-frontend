import User from "./User";

enum LESSOR_STATUS {
    ACTIVE = "ACTIVE",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED",
    REJECTED = "REJECTED"
}

export default class LessorLite implements ILessorLite {

    id: number;
    email: string;
    avatar: string;
    lastName: string;
    firstName: string;
    reference: string;
    cniNumber: string;
    createdAt: string;
    updatedAt: string;
    status: LESSOR_STATUS;

    constructor(data: any) {
        this.id = data.id;
        this.email = data.email;
        this.status = data.status;
        this.avatar = data.avatar;
        this.lastName = data.lastName;
        this.cniNumber = data.cniNumber;
        this.firstName = data.firstName
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.reference = data.reference;
    }

}

export interface ILessorLite {
    id: number;
    email: string;
    avatar: string;
    lastName: string;
    firstName: string;
    cniNumber: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    status: LESSOR_STATUS;
}