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
        getAllContracts: function () {
            return $http.get(url2 + '/api/get_all_contracts');
        },
        getContract: function (id) {
            return $http.get(url2 + '/api/get_contract_data_by_address/' + id);
        },
        createContract: function (id) {
            return $http.post(url2 + '/api/generate_new_contract', {tracking_no : id});
        },
        modifyValuesEth: function (id, data) {
            return $http.put(url2 + '/api/update_contract_data_by_tracking/' + id, data);
        },
        acceptTransaction: function (id) {
            return $http.post(url + '/accept/' + id);
        },
        decline: function (id) {
            return $http.post(url + '/decline/' + id);
        }
    }
});
