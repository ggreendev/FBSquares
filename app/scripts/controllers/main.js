'use strict';

angular.module('sbGridApp')
  .controller('MainCtrl', function ($scope) {
    var userId = 0;
    $scope.participants = [];
    $scope.partTable = {
        error: '',
        empty: 0,
        headers: {
            top: [],
            side: [],
        },
        participants: []
    }

    $scope.resetNewUser = function() {
        $scope.newUser = {
            name: '',
            squares: '',
        }
    }

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (min + max +1) + min);
    }

    $scope.partTable.add = function(part) {
        var tries = 0;
        var empty = this.getSpacesLeft();

        if (part.squares > empty) {
            part.squares = empty;
        }

        for (var i=0; i < part.squares; i++) {
            var x = getRandomInt(0, 9);
            var y = getRandomInt(0, 9);

            // if the square is already filled, de-increment i
            // so that this one gets done again
            if (this.participants[y][x]) {
                if(this.empty <= 0) {
                    break;
                }
                i--;
                continue;
            } 

            this.participants[y][x] = part;
            this.empty--;
        }

        $scope.participants.push(part);
    }

    $scope.partTable.getSpacesLeft = function() {
        var participants = this.participants;
        this.empty = 0;
        for (var i=0; i<participants.length;i++) {
            var row = participants[i];
            for (var j=0; j<row.length; j++) {
                if (row[j] === undefined || row[j] === '') {
                    this.empty++;
                }
            }
        }
        return this.empty;
    }

    $scope.addUser = function() {
        var participant = {
            id: userId,
            name: $scope.newUser.name,
            squares: parseInt($scope.newUser.squares)
        }
        userId++;

        $scope.resetNewUser();
        $scope.partTable.add(participant);
        $scope.adding = !$scope.adding;


    }

    $scope.removeUser = function(id) {
        var partIndex = $scope.participants.indexOf(
            $scope.participants.filter(function(part) {
                return part.id === id;
            })[0]
        );

        if (partIndex > -1) {
            $scope.participants.splice(partIndex);
        }

        var partMat = $scope.partTable.participants;
        for (var i=0; i<partMat.length; i++) {
            for (var j=0; j<partMat[i].length; j++) {
                if (partMat[i][j] && partMat[i][j].id === id) {
                    $scope.partTable.participants[i][j] = undefined;
                }
            }
        }
    }

    $scope.range = function(stop) {
        var retVal = [];
        for (var i=0; i < stop; i++) {
            retVal[i] = i;
        }

        return retVal;
    }

    for (var i=0; i<10; i++) {
        $scope.partTable.headers.top[i] = i;
        $scope.partTable.headers.side[i] = i;
        $scope.partTable.participants[i] = [];
        $scope.partTable.participants[i].length = 10;
    }

    $scope.resetNewUser();
  });
