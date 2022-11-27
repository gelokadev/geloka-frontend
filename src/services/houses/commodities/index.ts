import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../../auth/FetchInterceptor';
import Commodity from "../../../models/house/Commodity";
import CommodityCategory from "../../../models/house/CommodityCategory";

export default class CommodityService {

    static getCommodities(): AxiosPromise<Commodity[]> {
        return fetch({
            url: Routes.GET_COMMODITIES,
            method: 'get'
        });
    }

    static findCommodities(reference: string): AxiosPromise<Commodity> {
        return fetch({
            url: Routes.FIND_COMMODITY(reference),
            method: 'get'
        });
    }

    static createCommodity(data: any): AxiosPromise<Commodity> {
        return fetch({
            data,
            method: 'post',
            url: Routes.CREATE_CATEGORY,
        });
    }

    static updateCommodity(reference: string, data: any): AxiosPromise<Commodity> {
        return fetch({
            data,
            method: 'put',
            url: Routes.UPDATE_COMMODITY(reference),
        });
    }

    static getCategories(): AxiosPromise<CommodityCategory[]> {
        return fetch({
            url: Routes.GET_CATEGORIES,
            method: 'get'
        });
    }

    static findCategory(reference: string): AxiosPromise<CommodityCategory> {
        return fetch({
            url: Routes.FIND_CATEGORY(reference),
            method: 'get'
        });
    }

    static createCommodityCategory(data: any): AxiosPromise<CommodityCategory> {
        return fetch({
            data,
            method: 'post',
            url: Routes.CREATE_CATEGORY,
        });
    }

    static updateCommodityCategory(reference: string, data: any): AxiosPromise<CommodityCategory> {
        return fetch({
            data,
            method: 'put',
            url: Routes.UPDATE_CATEGORY(reference),
        });
    }

}