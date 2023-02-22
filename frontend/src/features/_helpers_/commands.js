import jwt_decode from "jwt-decode"
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, API_URL} from './constants'


export function saveTokens(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}


async function refreshTokens(refreshToken) {
    console.log('start refresh tokens')
    return fetch(API_URL + '/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: refreshToken,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                const data = response.json()
                return Promise.resolve(data);
            }
            return Promise.reject();
        });
}


export async function fetchWithAuth(url, options) {

    const loginUrl = '/login'
    let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

    if (accessToken == null)
        return window.location.replace(loginUrl);

    if (Date.now() >= jwt_decode(accessToken)['exp'] * 1000) {
        console.log('token is expired')
        try {
            const data = await refreshTokens(localStorage.getItem(REFRESH_TOKEN_KEY))
            console.log(data)
            saveTokens(data['access'], data['refresh'])
            console.log('tokens already refresh')

        } catch (e) {
            localStorage.clear()
            return  window.location.replace(loginUrl);
        }
    }

    if (!options.headers)
        options.headers = {}

    options.headers.Authorization = 'Token ' + localStorage.getItem(ACCESS_TOKEN_KEY)

    return fetch(url, options)
}
