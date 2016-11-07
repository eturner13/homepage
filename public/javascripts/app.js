var app = angular.module("homepage", ["ngRoute", "ngAnimate"]);

app.controller('app', function($scope, $location, $http) {

  $http.get('/blog/posts').
    then(function(response) {
      $scope.posts = response.data;
    });
});

app.controller('readPost', function($scope, $http, $routeParams) {

  $http.get('/blog/' + $routeParams.id).
    then(function(response) {
      $scope.post = response.data;
    });
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "/about"
    })
    .when("/blog/:id", {
      templateUrl: "/blogPost",
      controller: "readPost"
    })
    .otherwise({
      redirectTo: "/"
    });
    $locationProvider.html5Mode(true);
});
