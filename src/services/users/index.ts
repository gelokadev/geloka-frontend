import * as Routes from "./routes";
import { AxiosPromise } from "axios";
import Utils from '../../utils/index';
import Lessor from "../../models/Lessor";
import fetch from '../../auth/FetchInterceptor';
import { OAUTH } from "../../configs/AppConfig";

export default class UserService {

    static loginUserAccount(data: any) {
        let headers = Utils.getFullAuthorisationRequestConfig();
        data.client_id = OAUTH.clientId;
        data.grant_type = OAUTH.grantType;
        return fetch({
            url: Routes.LOGIN_USER_ACCOUNT,
            method: 'post',
            headers,
            data
        });
    }

    static logout() {
        return fetch({
            url: Routes.LOGOUT,
            method: 'delete'
        });
    }

    static getLessors(): AxiosPromise<Lessor[]> {
        return fetch({
            url: Routes.GET_LESSORS,
            method: 'get'
        });
    }

}