/**
 * Created by jonayet on 10/29/16.
 */
import {appModule} from './../app.module';

function factory() {
    controller.$inject = ['$scope', '$timeout'];
    function controller($scope, $timeout) {
        var vm = this;
        vm.show = false;

        $scope.$watch('vm.error', function(newValue, oldValue) {
            if(!newValue) { return; }
            vm.show = true;

            if(!vm.duration) { return; }
            $timeout(function () {
                vm.show = false;
                vm.error = '';
            }, vm.duration);
        });
    }

    return {
        restrict: 'E',
        template: require('./error-viewer.view.html'),
        scope: {
            error: '=',
            duration: '='
        },
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
    }
}
factory.$inject = [];

export const errorViewer = 'errorViewer';
appModule.directive(errorViewer, factory);
