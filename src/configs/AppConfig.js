import { env } from './EnvironmentConfig';
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from '../constants/ThemeConstant';

export const APP_NAME = 'Factory API';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const ROOT = '/';
export const AUTH_PREFIX_PATH = '/auth';
export const ADMIN_PREFIX_PATH = '/admin';
export const ADMIN_ROLE = 'ADMIN';
export const USER_ROLE = 'USER';
export const OAUTH = {
    clientId: 'factory-app',
    clientSecret: 'kv:j-TjX95',
    grantType: 'password',
};

export const THEME_CONFIG = {
    navCollapsed: false,
    sideNavTheme: SIDE_NAV_LIGHT,
    locale: 'en',
    navType: NAV_TYPE_SIDE,
    topNavColor: '#3e82f7',
    headerNavColor: '',
    mobileNav: false,
    currentTheme: 'light',
    direction: DIR_LTR
};