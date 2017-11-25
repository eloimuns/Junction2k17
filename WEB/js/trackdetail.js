app.controller('TrackDetailCtrl', function($scope, $location, $routeParams, Service) {

  $scope.tooglePasteArea = function(){
    $scope.showPasteArea = !$scope.showPasteArea;
  }

  $scope.save = function(){
    Service.addSensors($routeParams.id, JSON.parse($scope.sensorData.data)).then(function(success) {
      if (success){
        if (success.data){
          $scope.init();
        }
      }
    })
  }

  $scope.init = function () {
    $scope.sensorData = {};
    $scope.showPasteArea = false;
    Service.getTrack($routeParams.id).then(function(success) {
      if (success){
        if (success.data){
          $scope.track = success.data[0];
        }
      }
    })
  }
  $scope.init();
});
