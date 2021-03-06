app.controller('TrackCtrl', function($scope, $location, $rootScope, Service) {

  $scope.showCreate = function(){
    $scope.viewNewRoute = !$scope.viewNewRoute;
  }

  $scope.save = function(){
    // Save to mongo
    Service.addTrack($scope.newTrack).then(function(success) {
      if (success){
        if (success.data){
          Service.createContract($scope.newTrack.number);
          $scope.init();
        }
      }
    })
  };

  $scope.reset = function(){
    $scope.newTrack = {};
  }

  $scope.goTo = function(track) {
    $location.path('/detail/' + track.number);
  }

  $scope.init = function(){
    $scope.viewNewRoute = false;
    $scope.newTrack = {};
    $scope.trackList = [];
    Service.getTracks().then(function(success) {
      if (success){
        if (success.data){
          $scope.trackList = success.data;
          $scope.trackList.forEach(function (t) {
            if (t.status == 'Pending'){
              t.color = "black";
            } else if (t.status == "Accepted"){
              t.color = "#28a745";
            } else {
              t.color = "red";
            }
          })
        }
      }
    })
  }
  $scope.init();
});
