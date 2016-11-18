var app = angular.module("homepage", ["ngRoute", "ngAnimate", "ngSanitize"]);

app.controller('app', function($scope, $http, $window) {
  $http.get('/api/posts').
    then(function(response) {
      $scope.posts = response.data;
    });
  $scope.entry = {title:"Add a title", body:"Insert a body; Use backslash to escape HTML closing tags"};
  $scope.submitPost = function () {
    $http.post('/api/addPost', $scope.entry).
    then(function() {
      $window.location.href = '/';
    })
  };
});

app.controller('readPost', function($scope, $http, $routeParams) {
  $http.get('/api/' + $routeParams.id).
    then(function(response) {
      $scope.post = response.data;
    });
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "/about"
    })
    .when("/:id", {
      templateUrl: "/blogPost",
      controller: "readPost"
    })
    .when("/addPost", {
      templateUrl: "/addPost"
    })
    .otherwise({
      redirectTo: "/"
    });
    $locationProvider.html5Mode(true);
});
