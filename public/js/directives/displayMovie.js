//var app = angular.module("Ratertainment", []);
app.directive("displayMovie", function() {
    console.log("testtest");
    return {
        restrict : "E",
        templateUrl : 'js/directives/display-movie.html'
//        template: "<h1>{{ movie.title }}</h1>"
    };
}); 