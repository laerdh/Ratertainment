// movies service
// collects all movies from API
app.factory('moviesService', ['$http', function ($http) {
    return $http.get('/movies')
    .success(function (data) {
        return data;
    })
    .error(function (err) {
        return err;
    });
}]);