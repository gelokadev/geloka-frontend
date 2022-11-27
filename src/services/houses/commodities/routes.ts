export const CREATE_COMMODITY = 'commodities/create';
export const GET_COMMODITIES = 'commodities/list/admin';
export const UPDATE_COMMODITY = (reference: string) => `commodities/${reference}/update`;
export const FIND_COMMODITY = (reference: string) => `commodities/find/${reference}/admin`;

export const CREATE_CATEGORY = 'commodities/categories/create';
export const GET_CATEGORIES = 'commodities/categories/list/admin';
export const UPDATE_CATEGORY = (reference: string) => `commodities/categories/${reference}/update`;
export const FIND_CATEGORY = (reference: string) => `commodities/categories/find/${reference}/admin`;