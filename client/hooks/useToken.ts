import { ResponseAuth } from './../../server/src/types/AuthType';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { API } from '../services';
import appConfig from '../config'
const { refreshToken } = API.create();
const { ACCESS_TOKEN, REFRESH_TOKEN } = appConfig;
const JWTManager = () => {
    let inMemoryToken: string | null = null;

    let refreshTokenTimeout: number | null = null;

    let userId: number | null = null;

    const LOGOUT_EVENT_NAME = 'logout';

    const getUserId = () => userId

    const getToken = () => inMemoryToken ? inMemoryToken : localStorage?.getItem(ACCESS_TOKEN)

    const setToken = (accessToken: string, refreshToken: string) => {
        inMemoryToken = accessToken
        localStorage?.setItem(ACCESS_TOKEN, accessToken)

        localStorage?.setItem(REFRESH_TOKEN, refreshToken)
        //Decode and set count down to refresh
        const decoded = jwtDecode<JwtPayload & { userId: number }>(accessToken)
        userId = decoded.userId;
        setRefreshTokenTimeOut((decoded.exp as number) - (decoded.iat as number))

        return true
    }
    const abortRefreshToken = () => {
        if (refreshTokenTimeout) window.clearTimeout(refreshTokenTimeout)
        return true

    }
    const deleteToken = () => {
        inMemoryToken = null
        window.localStorage?.setItem(LOGOUT_EVENT_NAME, Date.now().toString())
        localStorage?.removeItem(ACCESS_TOKEN)
        localStorage?.removeItem(REFRESH_TOKEN)
        abortRefreshToken()
    }
    if (typeof window === "undefined") {
        console.log("Oops, `window` is not defined")
    } else {
        window.addEventListener('storage', event => {
            if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null
        })
    }

    const getRefreshToken = async () => {
        try {
            if (!getToken()) return false;
            const response = await refreshToken();
            const data = <ResponseAuth>response.data;
            setToken(data.accessToken as string, data.refreshToken as string)
            return true
        } catch (error) {
            console.error('UNAUTHENTICATION', error)
            deleteToken()
            return false
        }

    }
    const setRefreshTokenTimeOut = (delay: number) => {
        //5s before token expires
        refreshTokenTimeout = window.setTimeout(getRefreshToken, delay * 1000 - 5000)
    }

    return { getToken, setToken, getRefreshToken, deleteToken, getUserId }
}
export default JWTManager()