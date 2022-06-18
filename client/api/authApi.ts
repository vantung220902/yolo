import { ACCESS_TOKEN, API_END_POINT, REFRESH_TOKEN } from './../constants/index';
import { LoginInput, RegisterInput } from './../../server/src/types/AuthType';
import AxiosService from '../config/configAxios'
export const loginAPi = (data: LoginInput) => {
    return AxiosService.post(`${API_END_POINT}auth/login`, data)
}
export const registerAPi = (data: RegisterInput) => {
    return AxiosService.post(`${API_END_POINT}auth/register`, data)
}
export const meAPi = () => {
    return AxiosService.get(`${API_END_POINT}auth/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    })
}
export const logoutApi = () => {
    return AxiosService.get(`${API_END_POINT}auth/logout`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    })
}

export const refreshApiAPi = () => {
    return AxiosService.get(`${API_END_POINT}auth/refreshToken`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
        }
    })
}