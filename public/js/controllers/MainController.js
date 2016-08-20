app.controller('MainController', ['$scope', 'moviesService', function($scope, moviesService) {
    
    $scope.greeting = "Welcome, Lars Dahl";
    
    var refresh = function() {
        moviesService.get()
            .success(function(data) {
                console.log("Fetched movies");
                $scope.movielist = data;
                $scope.movie = "";
            });
    }
    
    refresh();
    
    $scope.addMovie = function() {
        moviesService.create($scope.movie);
        refresh();
    }
    
    $scope.deleteMovie = function(id) {
        moviesService.delete(id)
            .success(function(response) {
            console.log("Deleted id: " + id);
            refresh();
        });
    }
    
    $scope.like = function(id) {
        moviesService.find(id)
            .success(function(data) {
            data.likes++;
            moviesService.update(id, data);
            console.log("Likes: " + data.likes);
            refresh();
        });
    }

}]);