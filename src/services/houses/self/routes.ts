export const GET_ALL_HOUSES = 'houses/all';
export const VALIDATE_HOUSE = (reference: string) => `houses/${reference}/validate`;
export const FIND_HOUSE = (reference: string) => `houses/details/reference/${reference}`;