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
        this.requestAbroatTimeout = 20000;
        this.userId = '';
        this.accessToken = accessToken;
    }

    isUserExist(userId){
        this.userId = userId;
        if(!userId) return this.$q.reject('user-id is empty.');
        return this.httpGet(this.addToken(`https://api.github.com/users/${this.userId}`));
    }

    getRepositories(userId, pageNo = 1, itemPerPage = 10) {
        this.userId = userId;
        let url = this.addToken(`https://api.github.com/users/${userId}/repos`);
        url = this.addParam(url, 'page', pageNo);
        url = this.addParam(url, 'per_page', itemPerPage);
        return this.httpGet(url).then(response => response.data);
    }

    addToken(url) {
        if (!this.accessToken) return url;
        return this.addParam(url, 'access_token', this.accessToken);
    }

    addParam(url, key, value) {
        if(!value) return;
        var joiner = url.indexOf('?') === -1 ? '?' : '&';
        return url + joiner + key + '=' + value;
    }

    httpGet(url) {
        return this.$http({
            method: 'GET',
            url: url,
            timeout: this.requestAbroatTimeout
        }).catch((error) => {
            const errorMessage = error.status == 404 ? `'${this.userId}' doesn't exist.` : 'Unknown error occurred.';
            return this.$q.reject(errorMessage);
        });
    }
}
GithubService.$inject = ['$http', '$q'];

export const githubService = 'githubService';
appModule.service(githubService, GithubService);