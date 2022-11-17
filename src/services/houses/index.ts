import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../auth/FetchInterceptor';
import Commodity from "../../models/Commodity";

export default class HouseService {
    static getCommodities(): AxiosPromise<Commodity[]> {
        return fetch({
            url: Routes.GET_COMMODITIES,
            method: 'get'
        });
    }
}