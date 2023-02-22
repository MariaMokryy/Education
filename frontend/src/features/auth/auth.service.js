import {API_URL, REFRESH_TOKEN_KEY} from '../_helpers_/constants'


export default class AuthService {

    static async login(user, password) {

        return fetch(API_URL + '/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: password,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.json()
                    return Promise.resolve(data)
                }
                return Promise.reject();
            });
    }


    static async logout() {
        return fetch(API_URL + '/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY),
            }),
        })
            .then((response) => {
                if (response.status === 205) {
                    localStorage.clear()
                    return Promise.resolve()
                }
                return Promise.reject();
            });
    }
}