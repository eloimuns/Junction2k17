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

    $scope.goBack = function () {
      $location.path('/');
    };

    $scope.submit = function () {
        Service.acceptTransaction($routeParams.id).then(function (success) {
            $scope.init();
        })
    };

    $scope.decline = function () {
        Service.decline($routeParams.id).then(function (succ) {
            $scope.init();
        })
    }

    $scope.mapaErrorsETH = {
        "temperature": 0,
        "delay": 0,
        "pressure": 0,
        "light": 0,
        "breakageAlert": 0
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
                                            $scope.mapaErrorsETH.temperature = val;
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
                                        $scope.mapaErrorsETH.temperature = val;
                                    })
                                }
                            } else if (sensor.sensorType === "GYROSCOPE") {
                                if (!$scope.mapErrors.errorGyro && sensor.values.length > 2) {
                                    if (sensor.values[2] > 45 || sensor.values[2] < -45) {
                                        $scope.mapErrors.errorGyro = true;
                                        $scope.errors.push("Cargo or container got an overturn.");
                                        $scope.mapaErrorsETH.breakageAlert = 1;
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
                                                        "accept the transaction.");
                                                    $scope.mapaErrorsETH.breakageAlert = 1;
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
                                                        "Check it before accept the transaction.");
                                                    $scope.mapaErrorsETH.breakageAlert = 1;
                                                }
                                            }
                                        })
                                    }

                                }
                            } else if (sensor.sensorType === "LIGHT"){
                                if (!$scope.mapErrors.errorLight && sensor.values[0] > 2){
                                    $scope.mapErrors.errorLight = true;
                                    $scope.errors.push("The cargo may had been opened during the ride.");
                                    $scope.mapaErrorsETH.light = 1;
                                }
                            } else if (sensor.sensorType === "BAROMETER"){
                                if (!$scope.mapErrors.errorPressureMin && $scope.track.isPressure && $scope.track.minpressure){
                                    if (sensor.values[1] < $scope.track.minpressure ){
                                        $scope.mapErrors.errorPressureMin = true;
                                        $scope.errors.push("The cargo got a lower pressure, " + sensor.values[1] + " BAR");
                                        $scope.mapaErrorsETH.pressure = 1;
                                    }
                                }
                                if (!$scope.mapErrors.errorPressureMax && $scope.track.isPressure && $scope.track.maxpressure){
                                    if (sensor.values[1] > $scope.track.maxpressure ){
                                        $scope.mapErrors.errorPressureMax = true;
                                        $scope.errors.push("The cargo got a higher pressure, " + sensor.values[1] + " BAR");
                                        $scope.mapaErrorsETH.pressure = 1;
                                    }
                                }
                            }
                        });
                        Service.modifyValuesEth($scope.mapaErrorsETH);
                    }
                }
            }
        });
        $scope.initFake();
    };


    $scope.initFake = function () {
        $scope.errorsDriver = [];
        $scope.warningsDriver = [];

        // FAKE DATA
        $scope.hoursPerday = [
            7, 10, 11
        ];
        $scope.stopsPerDay = { day0 : [45, 33, 12], day1 : [13, 45, 72], day2 : [33, 45, 66]};
        // CHART
        $scope.labels = [];
        $scope.valuesH = [];

        $scope.hoursPerday.forEach(function (t, ind) {
            $scope.stopsPerDay["day" + ind].forEach(function (t2) {
                if ($scope.valuesH.length <= ind){
                    $scope.valuesH[ind] = [];
                }
                $scope.valuesH[ind].push(t2);
            });
        });

        $scope.hoursPerday.forEach(function (t, ind) {
            $scope.labels.push("DAY " + (ind +1));
            if (t > 9){
                $scope.errorsDriver.push("Driver rides " + t + "h one day.")
            }
            if (t > 8){
                var err = true;
                $scope.stopsPerDay["day" + ind].forEach(function (t2) {
                    if (t2 > 45) {
                        err = false;
                    }
                    if (t2 < 15){
                        $scope.warningsDriver.push("At least one stop was so small.");
                    }
                });
                if (err){
                    $scope.errorsDriver.push("Driver didn't stop 45 minutes every 4:30h.")
                }
            }
        });

        $scope.checkMaxHoursPerDay = function () {
            var ret = false;
            $scope.hoursPerday.forEach(function (h) {
                if (h > 8){
                    ret = true;
                }
            });
            return ret;
        };

        $scope.stops = ["STOP 1", "STOP 2"];

        $scope.data = $scope.hoursPerday;

        $scope.randomInterval = function(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        };
        $scope.distance = $scope.randomInterval(500, 4000);
    };





    $scope.init();

});
