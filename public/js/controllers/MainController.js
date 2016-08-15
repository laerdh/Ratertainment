app.controller('MainController', ['$scope', 'moviesService', function($scope, moviesService) {
    
    $scope.greeting = "Welcome, Lars";
    
	moviesService.success(function(data) {
        $scope.movies = data;
  });
}]);