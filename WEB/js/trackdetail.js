app.controller('TrackDetailCtrl', function($scope, $location, $routeParams, Service) {
  $scope.sensorData = {};
  $scope.showPasteArea = false;
  Service.getTrack($routeParams.id).then(function(success) {
    if (success){
      if (success.data){
        $scope.track = success.data;
      }
    }
  })
  $scope.back = function(track) {
    $location.path('/');
  }

  $scope.tooglePasteArea = function(){
    $scope.showPasteArea = !$scope.showPasteArea;
  }

  $scope.save = function(){
    console.log($scope.sensorData)
  }
});
