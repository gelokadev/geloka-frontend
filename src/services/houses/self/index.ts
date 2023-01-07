import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../../auth/FetchInterceptor';
import House from "../../../models/house/House";

export default class HouseService {

    static getHouses(): AxiosPromise<{content: House[], size: number, totalPages: number, totalElements: number}> {
        return fetch({
            url: Routes.GET_ALL_HOUSES,
            method: 'get'
        });
    }

    static findHouse(reference: string): AxiosPromise<House> {
        return fetch({
            url: Routes.FIND_HOUSE(reference),
            method: 'get'
        });
    }


    static validateHouse(reference: string, data: {status: boolean, reason: string|null}): AxiosPromise<House> {
        return fetch({
            url: Routes.VALIDATE_HOUSE(reference),
            method: 'put',
            data
        });
    }
}