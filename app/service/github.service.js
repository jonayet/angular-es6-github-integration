/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './../app.module';
import {accessToken} from './../../access-token';

export class GithubService {
    constructor($http, $q) {
        Object.assign(this, {
            $http,
            $q
        });
    }

    isUserExist(userId){
        if(!userId) return this.$q.reject('user-id is empty.');
        return this.$http.get(this.addToken(`https://api.github.com/users/${userId}`)).catch(() => {
            return this.$q.reject(`'${userId}' doesn't exist.`);
        });
    }

    getRepositories(userId, pageNo = 1, itemPerPage = 10) {
        let url = this.addToken(`https://api.github.com/users/${userId}/repos`);
        url = this.addParam(url, 'page', pageNo);
        url = this.addParam(url, 'per_page', itemPerPage);
        return this.$http.get(url).then(response => response.data);
    }

    addToken(url) {
        if (!accessToken) return url;
        return this.addParam(url, 'access_token', accessToken);
    }

    addParam(url, key, value) {
        if(!value) return;
        var joiner = url.indexOf('?') === -1 ? '?' : '&';
        return url + joiner + key + '=' + value;
    }
}
GithubService.$inject = ['$http', '$q'];

export const githubService = 'githubService';
appModule.service(githubService, GithubService);