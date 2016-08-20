// movies service
// collects all movies from API
app.factory('moviesService', ['$http', function ($http) {
    return {
        
        // call to get all movies
        get : function() {
            return $http.get('/movies');
        },
           
        // post movies
        create : function(data) {
            return $http.post('/movies', data);
        },
        
        // delete movie
        delete : function(id) {
            return $http.delete('/movies/' + id);
        }
    }
}]);