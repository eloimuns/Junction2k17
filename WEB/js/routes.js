app.config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TrackCtrl'
    }).when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'TrackDetailCtrl'
    }).when('/contracts', {
        templateUrl: 'views/contracts.html',
        controller: 'ContractsCtrl'
    }).when('/contract/:id', {
        templateUrl: 'views/contract_details.html',
        controller: 'ContractDetailsCtrl'
    });
}]);
