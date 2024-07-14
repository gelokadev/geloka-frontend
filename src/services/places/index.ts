import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../auth/FetchInterceptor';
import PopularPlace, { PopularPlaceType } from "../../models/PopularPlace";
import Country from "../../models/Country";
import City from "../../models/City";

export default class PlaceService {

    static getCountries(): AxiosPromise<Country[]> {
        return fetch({
            url: Routes.GET_COUNTRIES,
            method: 'get'
        })
    }

    static getCountryCities(params: any): AxiosPromise<City[]> {
        return fetch({
            params,
            url: Routes.GET_CITIES,
            method: 'get'
        });
    }

    static getPopular(type: PopularPlaceType): AxiosPromise<PopularPlace[]> {
        return fetch({
            params: {type},
            url: Routes.GET_POPULAR_PLACES,
            method: 'get'
        });
    }

    static createPopular(data: any): AxiosPromise<PopularPlace> {
        return fetch({
            data,
            method: 'post',
            url: Routes.CREATE_POPULAR_PLACE
        });
    }

    static findPopular(reference: string): AxiosPromise<PopularPlace> {
        return fetch({
            method: 'get',
            url: Routes.FIND_POPULAR_PLACE(reference),
        });
    }

    static updatePopular(reference: string, data: any): AxiosPromise<PopularPlace> {
        return fetch({
            data,
            method: 'put',
            url: Routes.UPDATE_POPULAR_PLACE(reference),
        });
    }

    static updatePopularStatus(reference: string): AxiosPromise<PopularPlace> {
        return fetch({
            data: {},
            method: 'put',
            url: Routes.UPDATE_POPULAR_PLACE_STATUS(reference),
        });
    }

}