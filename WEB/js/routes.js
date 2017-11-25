app.config(['$routeProvider', 'ChartJsProvider', function($routeProvider, ChartJsProvider) {
     $routeProvider
       .when('/', {
         templateUrl: 'views/main.html',
         controller: 'TrackCtrl'
     }).when('/detail/:id', {
       templateUrl: 'views/detail.html',
       controller: 'TrackDetailCtrl'
   });

}]);
