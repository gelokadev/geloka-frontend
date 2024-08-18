import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import fetch from '../../auth/FetchInterceptor';
import Onboarding from "../../models/Onboarding";

export default class SystemService {

    static createOnboarding(data: any) {
        return fetch({
            url: Routes.CREATE_ONBOARDING,
            method: 'post',
            data
        });
    }

    static deleteOnboarding(reference: string) {
        return fetch({
            url: Routes.DELETE_ONBOARDING(reference),
            method: 'delete'
        });
    }

    static getOnboardings(): AxiosPromise<Onboarding[]> {
        return fetch({
            url: Routes.GET_ONBOARDINGS,
            method: 'get'
        });
    }

    static updateOnboarding(reference: string, data: any) {
        return fetch({
            url: Routes.UPDATE_ONBOARDING(reference),
            method: 'put',
            data
        });
    }


    static findOnboarding(reference: string) {
        return fetch({
            url: Routes.FIND_ONBOARDING(reference),
            method: 'get'
        });
    }

}