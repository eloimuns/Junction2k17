app.controller('ContractsCtrl', function ($scope, $location, $routeParams, Service) {
    $scope.init = function () {

    };
    $scope.init = function(){
      Service.getContracts().then(function(success) {
        if (success){
          if (success.data){
            $scope.contracts = success.data;
            $scope.init();
          }
        }
      })
    };


});
