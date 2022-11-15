import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from '../configs/AppConfig';

export const HOME = `${APP_PREFIX_PATH}/home`;

export const LANDING = {
    ROOT: `/`,
    HOME: `/home`,
}

export const AUTH = {
    LOGIN: `${AUTH_PREFIX_PATH}/login`
}

export const HOUSE = {         
    SELF: `${APP_PREFIX_PATH}/houses`,
    COMMODITY: {
        SELF: `${APP_PREFIX_PATH}/commodities`,
        LIST: `${APP_PREFIX_PATH}/commodities/list`,
        CREATE: `${APP_PREFIX_PATH}/commodities/create`,
        UPDATE: `${APP_PREFIX_PATH}/commodities/update`,
    }
}
