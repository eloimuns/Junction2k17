app.controller('ContractsCtrl', function ($scope, $location, $routeParams, Service) {
    $scope.goTo = function (row) {
        $location.path('/contract/' + row.contract_address);
    };
    $scope.init = function(){
      Service.getAllContracts().then(function(success) {
        if (success){
          if (success.data){
            $scope.contracts = success.data;
          }
        }
      })
    };
    $scope.init();


});
