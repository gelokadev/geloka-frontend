import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../../auth/FetchInterceptor';
import HouseCategory from "../../../models/house/Category";

export default class HouseCategoryService {

    static getCategories(): AxiosPromise<HouseCategory[]> {
        return fetch({
            url: Routes.GET_CATEGORIES,
            method: 'get'
        });
    }

    static findCategory(reference: string): AxiosPromise<HouseCategory> {
        return fetch({
            url: Routes.FIND_CATEGORY(reference),
            method: 'get'
        });
    }

    static createCategory(data: any): AxiosPromise<HouseCategory> {
        return fetch({
            data,
            method: 'post',
            url: Routes.CREATE_CATEGORY,
        });
    }

    static updateCategory(reference: string, data: any): AxiosPromise<HouseCategory> {
        return fetch({
            data,
            method: 'put',
            url: Routes.UPDATE_CATEGORY(reference),
        });
    }
}