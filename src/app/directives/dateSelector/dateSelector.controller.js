(function () {
    'use strict';

    angular.module('siteWeather.directives')
        .controller('DateSelectorController', dateSelectorController);

    function dateSelectorController($log, $state, $stateParams) {
        var vm = this;

        vm.hasPrevious = hasPrevious;
        vm.hasNext = hasNext;
        vm.selectPrevious = selectPrevious;
        vm.selectNext = selectNext;
        vm.currentDate = undefined;

        activate();

        //---------------------
        function activate() {
            $log.debug("Init dateSelectorController with dates :", vm.dates);
            if (vm.dates[$stateParams.day]) {
                vm.currentDate = moment().add($stateParams.day, 'days').format('dddd DD/MM/YYYY');
            } else {
                $log.info("Invalid day param, use default one");
                reload(0);
            }
        }

        function hasPrevious() {
            return vm.dates[parseInt($stateParams.day) - 1];
        }

        function hasNext() {
            return vm.dates[parseInt($stateParams.day) + 1];
        }

        function selectPrevious() {
            if (hasPrevious()) {
                reload(parseInt($stateParams.day) - 1);
            }
        }

        function selectNext() {
            if (hasNext()) {
                reload(parseInt($stateParams.day) + 1);
            }
        }

        function reload(day) {
            $state.go('root.day', {day: day}, {reload: true});
        }
    }

})();
