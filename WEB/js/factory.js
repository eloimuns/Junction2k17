app.factory('Service', function ($http) {
  var url = 'http://localhost:8888'
  return {
    addTrack: function (track) {
      return $http.post(url + '/addTruck', track);
    },
    getTracks: function(){
        return $http.get(url + '/trucks');
    },
    getTrack: function(id){
      return $http.get(url + '/truck/' + id);
    }
  }
});
