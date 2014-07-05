'use strict';

var app = angular.module('sbGridApp.controllers', ['sbGridApp.services']);

app.controller('MainCtrl', function ($scope, grid, users) {
    $scope.grid = grid.createGrid();

    $scope.removeUser = function(id) {
        $scope.grid.removeUser(id);
    };

    $scope.addUser = function() {
        var user = users.createUser($scope.newUser.name, $scope.newUser.squares);
        $scope.grid.addUser(user);
        $scope.newUser = undefined;
        $scope.adding = false;
    };

    $scope.range = function(stop) {
        var retVal = [];
        for (var i=0; i < stop; i++) {
            retVal[i] = i;
        }

        return retVal;
    };

});
