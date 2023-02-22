import {API_URL} from "../_helpers_/constants";
import {fetchWithAuth} from "../_helpers_/commands";

export default class UnitsService {

    static async getAllCategories() {
        return fetchWithAuth(API_URL + '/category/', {
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

    static async getAllCourses() {
        return fetchWithAuth(API_URL + '/course/', {
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

    static async getAllModules() {
        return fetchWithAuth(API_URL + '/module/', {
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