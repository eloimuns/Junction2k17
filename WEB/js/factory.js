app.factory('Service', function ($http) {
  var url = 'http://'
  return {
    addTrack: function (track) {
      console.log(track)
      return $http.post(url + '/track', track);
    },
    getTracks: function(){
        return $http.get(url + '/track');
    }
  }
});
