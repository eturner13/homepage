var app = angular.module("homepage", ["ngRoute"]);

app.controller('homeCtrl', function($scope) {
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/pages/main.html"
    })
    .when("/blog", {
        templateUrl : "/pages/blog.html"
    })
    .otherwise({
        redirectTo: "/"
      });
    $locationProvider.html5Mode(true);
});