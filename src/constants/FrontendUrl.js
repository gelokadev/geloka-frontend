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
    LIST: `${APP_PREFIX_PATH}/houses/list`,
    DETAILS: `${APP_PREFIX_PATH}/houses/:reference/details`,
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

export const POPULAR_PLACE = {
    SELF: `${APP_PREFIX_PATH}/popular-places`,
    CITY: {
        SELF: `${APP_PREFIX_PATH}/popular-places/cities`,
        LIST: `${APP_PREFIX_PATH}/popular-places/cities/list`,
        CREATE: `${APP_PREFIX_PATH}/popular-places/cities/create`,
        UPDATE: `${APP_PREFIX_PATH}/popular-places/cities/:reference/update`,
    },
    POINT: {
        SELF: `${APP_PREFIX_PATH}/popular-places/points`,
        LIST: `${APP_PREFIX_PATH}/popular-places/points/list`,
        CREATE: `${APP_PREFIX_PATH}/popular-places/points/create`,
        UPDATE: `${APP_PREFIX_PATH}/popular-places/points/:reference/update`,
    }
}
