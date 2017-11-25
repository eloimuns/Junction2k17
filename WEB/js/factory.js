app.factory('Service', function ($http) {
  var url = 'http://localhost:8888'
  return {
    addTrack: function (track) {
      console.log(track)
      return $http.post(url + '/addTruck', track);
    },
    getTracks: function(){
        return $http.get(url + '/trucks');
    }
  }
});
