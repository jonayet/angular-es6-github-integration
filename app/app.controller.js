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
        this.isLoading = true;
        this.gridOptions = {
            enableFullRowSelection: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'name', displayName: 'Name', width: 100 },
                { field: 'stargazers_count', displayName: 'Star' },
                { field: 'forks_count', displayName: 'Fork' },
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
        };
    }

    $onInit(){
        this.userId = this.$state.params['userId'];

        this.isLoading = true;
        this.githubService.isUserExist(this.userId).then(() => {
            this.isUserIdValid = true;
        }, () => {
            this.error = `'${this.userId}' doesn't exist.`;
        }).finally(() => {
            this.isLoading = false;
        });
    }

    shouldPromptUser(){
        return !this.isLoading && !this.isUserIdValid;
    }
}
AppController.$inject = ['$state', '$scope', githubService];

export const appController = 'appController';
appModule.controller(appController, AppController);