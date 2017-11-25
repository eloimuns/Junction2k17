app.controller('MainCtrl', function($scope, $location) {
  $scope.aa = {};
  $scope.getActive = function () {
      $scope.active = "";
      if ($location.path() === "/"){
          $scope.active = "HOME";
      } else if ($location.path().indexOf("contracts") !== -1){
          $scope.active = "CONTRACTS";
      }
      return $scope.active;
  };

  $scope.goTo = function(path) {
      $location.path(path);
  }

});
