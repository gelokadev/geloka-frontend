import User from "./User";
import { convertDate } from "../datas/helper";

enum LESSOR_STATUS {
    ACTIVE = "ACTIVE",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED",
    REJECTED = "REJECTED"
}

export default class Lessor implements ILessor {

    id: number;
    email: string;
    userInfo: User;
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
        this.userInfo = new User(data.userInfo);
    }

    getParsedDate() {
        return convertDate(this.createdAt);
    }

}

export interface ILessor {
    id: number;
    email: string;
    avatar: string;
    userInfo: User;
    lastName: string;
    firstName: string;
    cniNumber: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    status: LESSOR_STATUS;
}