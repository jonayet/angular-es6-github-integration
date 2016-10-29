/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './app.module';
import {githubService} from './service/github.service';
import './component/github-user.component';
import './component/error-viewer.component';

class AppController {
    constructor($scope, $state, $q, githubService){
        Object.assign(this, {
            $scope,
            $state,
            $q,
            githubService
        });

        this.userId = '';
        this.currentPage = 1;
        this.isUserChecked = false;
        this.loadingRepositories = false;
        this.isUserIdValid = false;
        this.hasRepository = false;

        this.gridOptions = this.createGridOptions();
        this.gridOptions.onRegisterApi = (gridApi) => {
            this.registerGridApi(gridApi);
        };

        this.onValidUserId = (userId) => {
            this.isUserIdValid = true;
            this.$state.go('.', {userId: userId}, {notify: false});
            this.showRepositories(userId);
        };
    }

    $onInit(){
        this.userId = this.$state.params['userId'];
        this.checkUserId(this.userId).then(() => {
             this.showRepositories(this.userId);
        });
    }

    home(){
        this.isUserIdValid = false;
        this.gridOptions.data = [];
    }

    createGridOptions(){
        return {
            enableFullRowSelection: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            infiniteScrollRowsFromEnd: 5,
            infiniteScrollUp: false,
            infiniteScrollDown: true,
            columnDefs: [
                { field: 'name', displayName: 'Name' },
                { field: 'stargazers_count', displayName: 'Stars', width: 100 },
                { field: 'forks_count', displayName: 'Forks', width: 100 },
                { field: 'url', displayName: 'Url' }
            ]
        }
    }

    registerGridApi(gridApi){
        gridApi.selection.on.rowSelectionChanged(this.$scope, (row) => {
            //console.log(row.entity)
        });

        gridApi.infiniteScroll.on.needLoadMoreData(this.$scope, () => {
            this.infiniteScrollLoadMore(gridApi);
        });
    }

    checkUserId(userId){
        this.isUserChecked = false;
        this.isUserIdValid = false;
        return this.githubService.isUserExist(userId).then(() => {
            this.isUserIdValid = true;
        }).finally(() => {
            this.isUserChecked = true;
        });
    }

    showRepositories(userId){
        this.loadingRepositories = true;
        this.githubService.getRepositories(userId).then((repositories) => {
            this.loadingRepositories = false;
            this.currentPage = 1;
            this.generateGridData(repositories);
        }, (error) => {
            this.error = error;
        });
    }

    infiniteScrollLoadMore(gridApi){
        gridApi.infiniteScroll.saveScrollPercentage();
        this.githubService.getRepositories(this.userId, this.currentPage + 1, 10).then((repositories) => {
            const hasNewData = repositories.length !== 0;
            if(hasNewData) {
                const currentData =  this.gridOptions.data;
                this.generateGridData(currentData.concat(repositories));
                this.currentPage++;
            }
            gridApi.infiniteScroll.dataLoaded(false, hasNewData);
        }, (error) => {
            this.error = error;
            gridApi.infiniteScroll.dataLoaded(false, true);
        });
    }

    generateGridData(repositories){
        if(!repositories.length) {
            this.hasRepository = false;
            return;
        }
        this.hasRepository = true;
        this.gridOptions.data = repositories.map(repository => {
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
        return this.isUserChecked && !this.isUserIdValid;
    }

    shouldShowRepositories(){
        return this.isUserChecked && this.isUserIdValid && this.hasRepository;
    }

    shouldShowEmpty(){
        return this.isUserChecked && this.isUserIdValid && !this.loadingRepositories && !this.hasRepository;
    }
}
AppController.$inject = ['$scope', '$state', '$q', githubService];

export const appController = 'appController';
appModule.controller(appController, AppController);