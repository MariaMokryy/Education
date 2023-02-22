import {API_URL} from "../_helpers_/constants";
import {fetchWithAuth} from "../_helpers_/commands";

export default class UsersService {

    static async getAllUsers() {
        return fetchWithAuth(API_URL + '/employee/', {
            method: 'GET',
        })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.json()
                    return Promise.resolve(data);
                }
                return Promise.reject();
            });
    }

    static async getBranchUsers() {
        return fetchWithAuth(API_URL + '/employee/branch', {
            method: 'GET',
        })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.json()
                    return Promise.resolve(data);
                }
                return Promise.reject();
            });
    }

}