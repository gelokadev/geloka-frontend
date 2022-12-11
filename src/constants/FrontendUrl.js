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
        SELF: `${APP_PREFIX_PATH}/houses/commodities`,
        LIST: `${APP_PREFIX_PATH}/houses/commodities/list`,
        CREATE: `${APP_PREFIX_PATH}/houses/commodities/create`,
        UPDATE: `${APP_PREFIX_PATH}/houses/commodities/:reference/update`,
        CATEGORY: {
            SELF: `${APP_PREFIX_PATH}/houses/commodities/category`,
            LIST: `${APP_PREFIX_PATH}/houses/commodities/category/list`,
            CREATE: `${APP_PREFIX_PATH}/houses/commodities/category/create`,
            UPDATE: `${APP_PREFIX_PATH}/houses/commodities/category/:reference/update`,
        }
    },
    CATEGORY: {
        SELF: `${APP_PREFIX_PATH}/houses/categories`,
        LIST: `${APP_PREFIX_PATH}/houses/categories/list`,
        CREATE: `${APP_PREFIX_PATH}/houses/categories/create`,
        UPDATE: `${APP_PREFIX_PATH}/houses/categories/:reference/update`,
    }
}

export const USER = {
    SELF: `${APP_PREFIX_PATH}/users`,
    LESSOR: {
        SELF: `${APP_PREFIX_PATH}/users/lessors`,
        LIST: `${APP_PREFIX_PATH}/users/lessors/list`,
    }
}
