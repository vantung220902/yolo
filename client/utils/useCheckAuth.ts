import { ResponseAuth } from './../types/Auth/index';
import { AxiosResponse } from 'axios';
import { NextRouter } from 'next/router';
import { meAPi } from '../api/authApi';

export const useCheckAuth = async (router: NextRouter) => {
    const response: AxiosResponse<ResponseAuth, ResponseAuth> = await meAPi();
    const { data } = response;
    if (
        data?.user &&
        (router.route === '/auth/login' ||
            router.route === '/auth/register' ||
            router.route === '/auth/forgot-password' ||
            router.route === '/auth/change-password')
    ) {
        router.replace('/')
    } else if (
        !data?.user &&
        router.route !== '/auth/login' &&
        router.route !== '/auth/register'
        && router.route !== '/auth/forgot-password' && router.route !== '/auth/change-password'
    ) {
        router.replace('/auth/register')
    }

    return data.success ? data.user : undefined;
}