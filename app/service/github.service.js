/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './../app.module';

const accessToken = 'f84fabf31f81e14c445483696c86d068b43e7c9f';
class GithubService {
    constructor($http) {
        this.$http = $http;
    }

    isUserExist(userId){
        return this.$http.get(this.addToken(`https://api.github.com/users/${userId}`));
    }

    getRepositories(userId, pageNo, itemPerPage) {
        let url = this.addToken(`https://api.github.com/users/${userId}`);
        url = this.addParam(url, 'page', pageNo);
        url = this.addParam(url, 'per_page', itemPerPage);
        return this.$http.get(url);
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
GithubService.$inject = ['$http'];

export const githubService = 'githubService';
appModule.service(githubService, GithubService);