app.factory('Service', function ($http) {
    var url = 'http://localhost:8888';
    var url2 = 'http://localhost:8889';
    return {
        addTrack: function (track) {
            return $http.post(url + '/addTruck', track);
        },
        getTracks: function () {
            return $http.get(url + '/trucks');
        },
        getTrack: function (id) {
            return $http.get(url + '/truck/' + id);
        },
        addSensors: function (id, data) {
            return $http.post(url + '/addSensors/' + id, data);
        },
        modifyValuesEth: function (data) {
            return $http.put(url2 + '/addSensors/' + id, data);
        },
        getAllContracts: function () {
            return $http.get(url2 + '/getContracts');
        },
        getContract: function (id) {
            return $http.get(url2 + '/getContract/' + id);
        },
        acceptTransaction: function (id) {
            return $http.post(url + '/accept/' + id);
        },
        decline: function (id) {
            return $http.post(url + '/decline/' + id);
        }
    }
});
