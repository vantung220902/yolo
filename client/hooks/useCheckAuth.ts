import { NextRouter } from 'next/router';
import { API } from '../services';
import useToken from './useToken';
const { me } = API.create();

export default async (router: NextRouter) => {
  if (!useToken.getToken()) {
    if (router.route !== '/auth/login' && router.route !== '/auth/register') router.replace('/auth/login');
    return;
  }
  const response = await me();
  const { data } = response;

  if (data?.success)
    if (
      data?.user &&
      (router.route === '/auth/login' ||
        router.route === '/auth/register' ||
        router.route === '/auth/forgot-password' ||
        router.route === '/auth/change-password')
    ) {
      router.replace('/');
    } else if (
      !data?.user &&
      router.route !== '/auth/login' &&
      router.route !== '/auth/register' &&
      router.route !== '/auth/forgot-password' &&
      router.route !== '/auth/change-password'
    ) {
      router.replace('/auth/login');
    }

  return data?.success ? data.user : undefined;
};
