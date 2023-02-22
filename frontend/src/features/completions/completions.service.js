import {API_URL} from "../_helpers_/constants";
import {fetchWithAuth} from "../_helpers_/commands";

export default class CompletionsService {

    static async getAllCourseCompletions() {
        return fetchWithAuth(API_URL + '/course_completions/', {
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

    static async getBranchCourseCompletions() {
        return fetchWithAuth(API_URL + '/course_completions/branch', {
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

    static async getSelfCourseCompletions() {
        return fetchWithAuth(API_URL + '/course_completions/self', {
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


    static async getAllModuleCompletions() {
        return fetchWithAuth(API_URL + '/module_completions/', {
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


    static async getBranchModuleCompletions() {
        return fetchWithAuth(API_URL + '/module_completions/branch', {
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

    static async getSelfModuleCompletions() {
        return fetchWithAuth(API_URL + '/module_completions/self', {
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