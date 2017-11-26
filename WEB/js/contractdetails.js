app.controller('ContractDetailsCtrl', function ($scope, $location, $routeParams, Service) {
    $scope.init = function () {
        Service.getContract($routeParams.id).then(function (success) {
            if(success){
                if (success.data){
                    $scope.contract = success.data;
                }
            }
        })
    };
    $scope.init();
    $scope.goBack = function () {
        $location.path('/contracts');
    };
});
