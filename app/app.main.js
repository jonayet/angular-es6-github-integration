/**
 * Created by jonayet on 10/28/16.
 */
require('./../style/app.style.css');
import {appModule} from './app.module';
import './app.router';

function config(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}
config.$inject = ['cfpLoadingBarProvider'];

appModule.config(config);
angular.bootstrap(document, [appModule.name]);