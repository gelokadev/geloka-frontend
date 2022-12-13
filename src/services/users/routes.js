export const KYC = 'users/kyc';
export const LOGOUT = 'users/logout';
export const LOGIN_USER_ACCOUNT = 'oauth/token';


export const GET_LESSORS = 'lessors/all';
export const CHANGE_LESSOR_STATUS = (reference) => `lessors/${reference}/status`;
export const APPROVE_LESSOR_REQUEST = (reference) => `lessors/${reference}/approve`;