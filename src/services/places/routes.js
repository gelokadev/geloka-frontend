export const GET_COUNTRIES = 'places/countries';
export const GET_CITIES = 'places/countries/cities';

export const GET_POPULAR_PLACES = 'popular-places';
export const CREATE_POPULAR_PLACE = 'popular-places';
export const FIND_POPULAR_PLACE = (reference) => `popular-places/${reference}`;
export const UPDATE_POPULAR_PLACE = (reference) => `popular-places/${reference}`;
export const UPDATE_POPULAR_PLACE_STATUS = (reference) => `popular-places/${reference}/status`;