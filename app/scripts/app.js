'use strict';

angular.module('sbGridApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'sbGridApp.controllers',
  'sbGridApp.services',
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
