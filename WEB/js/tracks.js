app.controller('TrackCtrl', function($scope, $location, $rootScope, Service) {

  $scope.showCreate = function(){
    $scope.viewNewRoute = !$scope.viewNewRoute;
  }

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

  $scope.reset = function(){
    $scope.newTrack = {};
  }

  $scope.goTo = function(track) {
    $location.path('/detail/' + track.number);
  }

  $scope.init = function(){
    $scope.viewNewRoute = false;
    $scope.newTrack = {};
    scope.trackList = [];
    Service.getTracks().then(function(success) {
      if (success){
        if (success.data){
          $scope.trackList = success.data;
        }
      }
    })
  }
  $scope.init();
});
