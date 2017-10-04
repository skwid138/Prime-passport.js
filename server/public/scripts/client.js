var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: 'LoginController', 
      controllerAs: 'lc'
    })
    .when('/user', {
      templateUrl: '/views/user.html',
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
    })
    .otherwise({
      redirectTo: 'home'
    });
});