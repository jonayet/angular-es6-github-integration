/**
 * Created by jonayet on 10/28/16.
 */
import {appModule} from './app.module';
import {appController} from './app.controller';

function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'repositories',
        url: '/:userId',
        template: require("./view/app.view.html"),
        controller: appController,
        controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
}
routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

appModule.config(routerConfig);