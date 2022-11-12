import * as Routes from "./routes";
import Utils from '../../utils/index';
import fetch from '../../auth/FetchInterceptor';
import { OAUTH } from "../../configs/AppConfig";

export default class UserService {

    static loginUserAccount(data) {
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

}