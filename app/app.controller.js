/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './app.module';
import {githubService} from './service/github.service';
import './component/github-user.component';
import './component/error-viewer.component';

class AppController {
    constructor($state, $scope, githubService){
        Object.assign(this, {
            $state,
            githubService
        });

        this.userId = '';
        this.isUserIdValid = false;
        this.isLoading = false;
        this.gridOptions = {
            enableFullRowSelection: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'name', displayName: 'Name', width: 100 },
                { field: 'stargazers_count', displayName: 'Stars' },
                { field: 'forks_count', displayName: 'Forks' },
                { field: 'url', displayName: 'Url' }
            ]
        };

        this.gridOptions.onRegisterApi = (gridApi) => {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row.entity)
            });
        };

        this.onValidUserId = (userId) => {
            this.isUserIdValid = true;
            this.$state.go('.', {userId: userId}, {notify: false});
            this.showRepositories(userId);
        };
    }

    $onInit(){
        this.userId = this.$state.params['userId'];

        if(this.userId) {
            this.isLoading = true;
            this.githubService.isUserExist(this.userId).then(() => {
                this.isUserIdValid = true;
                this.showRepositories(this.userId);
            }, () => {
                this.error = `'${this.userId}' doesn't exist.`;
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }

    showRepositories(userId){
        this.githubService.getRepositories(userId, 1, 10).then((response) => {
            this.generateGridData(response.data);
        });
    }

    generateGridData(repositoryList){
        this.gridOptions.data = repositoryList.map(repository => {
            const {name, stargazers_count, forks_count, url} = repository;
            return {
                name,
                stargazers_count,
                forks_count,
                url
            }
        })
    }

    shouldPromptUser(){
        return !this.isLoading && !this.isUserIdValid;
    }
}
AppController.$inject = ['$state', '$scope', githubService];

export const appController = 'appController';
appModule.controller(appController, AppController);