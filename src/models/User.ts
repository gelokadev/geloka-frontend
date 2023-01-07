import { getFilePath } from "../datas/helper";

enum USER_ROLE {
    ADMIN = "ADMIN",
    USER = "USER",
    LESSOR_PENDIND = "LESSOR_PROCESSING",
    LESSOR = "LESSOR"
}

export default class User implements IUser {
    avatar: string|undefined;
    createdAt: string;
    email: string;
    firstName: string;
    fullName: string;
    id: number;
    lastName: string;
    otp: string;
    telephone: string;
    address: string;
    updatedAt: string;
    emailVerified: boolean;
    private role: USER_ROLE

    constructor(data: any) {
        this.avatar = getFilePath(data.avatar);
        this.createdAt = data.createdAt;
        this.email = data.email;
        this.firstName = data.firstName;
        this.id = data.id;
        this.lastName = data.lastName;
        this.fullName = data.fullName;
        this.otp = data.otp;
        this.telephone = data.telephone;
        this.address = data.address;
        this.updatedAt = data.updatedAt;
        this.role = data.type || data.role || "USER"
        this.emailVerified = data.emailVerified
    }

    getUserName(): string {
        return this.firstName + " " + this.lastName;
    }

    isHouseHunter() {
        return this.role === USER_ROLE.USER
    }

    isAdmin() {
        return this.role === USER_ROLE.ADMIN
    }

    isHost() {
        return this.role === USER_ROLE.LESSOR
    }

    isLessorProcessing() {
        return this.role === USER_ROLE.LESSOR_PENDIND
    }

}

export interface IUser {
    isHost: () => boolean;
    avatar: string|undefined;
    createdAt: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    otp: string;
    telephone: string;
    fullName: string;
    address: string;
    updatedAt: string;
    emailVerified: boolean
}