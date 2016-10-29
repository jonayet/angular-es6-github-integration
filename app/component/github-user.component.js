/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './../app.module';
import {githubService} from './../service/github.service';
import './error-viewer.component';

function factory() {
    controller.$inject = [githubService];
    function controller(githubService) {
        this.checkUserId = () => {
            return githubService.isUserExist(this.userId).then(() => {
                this.onValidUserId(this.userId);
            }, (error) => {
                this.error = error;
            });
        };
    }

    return {
        restrict: 'E',
        template: require('./github-user.view.html'),
        scope: {
            onValidUserId: '=',
            userId: '='
        },
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
    }
}
factory.$inject = [];

export const githubUser = 'githubUser';
appModule.directive(githubUser, factory);