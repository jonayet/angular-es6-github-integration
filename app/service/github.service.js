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
        if(!userId) return this.$q.reject('user-id is empty');
        return this.$http.get(this.addToken(`https://api.github.com/users/${userId}`));
    }

    getRepositories(userId, pageNo = 1, itemPerPage = 10) {
        let url = this.addToken(`https://api.github.com/users/${userId}/repos`);
        url = this.addParam(url, 'page', pageNo);
        url = this.addParam(url, 'per_page', itemPerPage);
        return this.$http.get(url).then((response) => {
            const linkHeader = response.headers('Link');
            return {
                pagination: this.createPagination(linkHeader),
                data: response.data
            };
        });
    }

    createPagination(linkHeader){
        if(!linkHeader) return {};
        return linkHeader.split(/,\s?/).reduce((pagination, link) => {
            const trimmedLink = link.replace(/[<>'"]/g, '');
            const linkParts = trimmedLink.split(/;\s?rel=/);
            if(linkParts.length === 1) return;
            const [url, key] = linkParts;
            pagination[key] = url;
            return pagination;
        }, {});
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

    getParams(url){
        const urlParts = url.split('?');
        if(urlParts.length === 1) return {};
        return urlParts[1].split('&').reduce((params, param) => {
            const [key, value] = param.split('=');
            params[key] = value;
            return params;
        }, {});
    }
}
GithubService.$inject = ['$http', '$q'];

export const githubService = 'githubService';
appModule.service(githubService, GithubService);