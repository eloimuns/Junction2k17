app.controller('TrackDetailCtrl', function ($scope, $location, $routeParams, Service) {

    $scope.tooglePasteArea = function () {
        $scope.showPasteArea = !$scope.showPasteArea;
    };

    $scope.toogleTableArea = function () {
        $scope.showTableArea = !$scope.showTableArea;
    };

    $scope.save = function () {
        Service.addSensors($routeParams.id, JSON.parse($scope.sensorData.data)).then(function (success) {
            if (success) {
                if (success.data) {
                    $scope.init();
                }
            }
        })
    };

    $scope.mapErrors = {
        errorMinTemp: false,
        errorMaxTemp: false,
        errorDelay: false,
        errorPressureMin: false,
        errorPressureMax: false,
        errorLight: false,
        errorVibration: false,
        errorGyro: false,
        errorFragile : false
    };

    $scope.init = function () {
        $scope.sensorData = {};
        $scope.showPasteArea = false;
        $scope.showTableArea = false;
        $scope.errors = [];
        $scope.warnings = [];
        $scope.acctmp = [];
        Service.getTrack($routeParams.id).then(function (success) {
            if (success) {
                if (success.data) {
                    $scope.track = success.data;
                    $scope.track.isPressure = $scope.track.isPressure === 1;
                    if ($scope.track.sensors) {
                        $scope.track.sensors.forEach(function (sensor) {
                            if (sensor.sensorType === "TEMPERATURE") {
                                if (!$scope.mapErrors.errorMinTemp && $scope.track.mintemp) {
                                    sensor.values.forEach(function (val) {
                                        if (val < $scope.track.mintemp && !$scope.mapErrors.errorMinTemp) {
                                            $scope.mapErrors.errorMinTemp = true;
                                            $scope.errors.push("Temperature got lower than "
                                                + $scope.track.mintemp + "ºC");
                                        }
                                    })
                                }
                                if (!$scope.mapErrors.errorMaxTemp && $scope.track.maxtemp) {
                                    sensor.values.forEach(function (val) {
                                        if (val > $scope.track.maxtemp && !$scope.mapErrors.errorMaxTemp) {
                                            $scope.mapErrors.errorMaxTemp = true;
                                            $scope.errors.push("Temperature got higher than "
                                                + $scope.track.maxtemp + "ºC");
                                        }
                                    })
                                }
                            } else if (sensor.sensorType === "GYROSCOPE") {
                                if (!$scope.mapErrors.errorGyro && sensor.values.length > 2) {
                                    if (sensor.values[2] > 45 || sensor.values[2] < -45) {
                                        $scope.mapErrors.errorGyro = true;
                                        $scope.errors.push("Cargo or container got an overturn.");
                                    }
                                }
                            } else if (sensor.sensorType === "ACCELEROMETER"){
                                $scope.acctmp.push(sensor.values);
                                if ($scope.acctmp.length > 5){
                                    if (!$scope.mapErrors.errorFragile){
                                        $scope.acctmp.forEach(function (acc) {
                                            if (acc.length > 2 && !$scope.mapErrors.errorFragile){
                                                if (acc[0] > 0.5 || acc[1] > 0.5 || acc[2] > 10 || acc[2] < 8){
                                                    $scope.mapErrors.errorFragile = true;
                                                    $scope.errors.push("The cargo probably got damaged. Check it before " +
                                                        "accept the transaction.")
                                                }
                                            }
                                        })
                                    }
                                    if (!$scope.mapErrors.errorVibration){
                                        $scope.acctmp.forEach(function (acc) {
                                            if (acc.length > 2 && !$scope.mapErrors.errorVibration){
                                                if (acc[0] > 0.8 || acc[1] > 0.8 || acc[2] > 12 || acc[2] < 6){
                                                    $scope.mapErrors.errorVibration = true;
                                                    $scope.errors.push("The cargo got a heavy vibrations during the road." +
                                                        "Check it before accept the transaction.")
                                                }
                                            }
                                        })
                                    }

                                }
                            } else if (sensor.sensorType === "LIGHT"){
                                if (!$scope.mapErrors.errorLight && sensor.values[0] > 2){
                                    $scope.mapErrors.errorLight = true;
                                    $scope.errors.push("The cargo may had been opened during the ride.")
                                }
                            } else if (sensor.sensorType === "BAROMETER"){
                                if (!$scope.mapErrors.errorPressureMin && $scope.track.isPressure && $scope.track.minpressure){
                                    if (sensor.values[1] < $scope.track.minpressure ){
                                        $scope.mapErrors.errorPressureMin = true;
                                        $scope.errors.push("The cargo got a lower pressure, " + sensor.values[1] + " BAR");
                                    }
                                }
                                if (!$scope.mapErrors.errorPressureMax && $scope.track.isPressure && $scope.track.maxpressure){
                                    if (sensor.values[1] > $scope.track.maxpressure ){
                                        $scope.mapErrors.errorPressureMax = true;
                                        $scope.errors.push("The cargo got a higher pressure, " + sensor.values[1] + " BAR");
                                    }
                                }
                            }
                        })
                    }
                }
            }
        })
    };
    $scope.init();
});
