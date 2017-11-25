app.controller('TrackCtrl', function($scope, $location, $rootScope, Service) {
  $scope.viewNewRoute = false;
  $scope.showCreate = function(){
    $scope.viewNewRoute = !$scope.viewNewRoute;
  }

  $scope.newTrack = {};

  $scope.save = function(){
    // Save to mongo
    Service.addTrack($scope.newTrack).then(function(success) {
      if (success){
        if (success.data){
          $scope.newTrack = {};
        }
      }
    })
  }

  Service.getTracks().then(function(success) {
    if (success){
      if (success.data){
        $scope.trackList = success.data;
      }
    }
  })

  $scope.reset = function(){
    $scope.newTrack = {};
  }

  $scope.trackList = [];

  $scope.goTo = function(track) {
    $location.path('/detail/' + track.number);
  }
});
