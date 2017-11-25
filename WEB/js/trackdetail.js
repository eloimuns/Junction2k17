app.controller('TrackDetailCtrl', function($scope, $location, $rootScope, Service) {

  $scope.back = function(track) {
    $location.path('/');
  }
});
