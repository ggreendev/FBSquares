'use strict';
var app = angular.module('sbGridApp.services', []);

app.service('grid', function() {
    function Grid() {
        this.users = [];
        this.grid = [];
        this.width = 10;
        this.height = 10;
        this.initGrid();
    }

    Grid.prototype.initGrid = function() {
        for (var x=0; x<this.width; x++) {
            this.grid[x] = [];
            this.grid[x].length = this.height;
        }
    }

    Grid.prototype.allocateUser = function(user) {
        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (min + max +1) + min);
        }

        for (var i=0; i<user.squares; i++) {
            var j = 100 - this.squaresTaken();
            while (j > 0) {
                var x = getRandomInt(0, 9);
                var y = getRandomInt(0, 9);
                if (this.grid[x][y] === undefined) {
                    this.grid[x][y] = user;
                    user.points.push([x, y]);
                    break;
                }
                j--;
            }
        }
        return user;
    }

    Grid.prototype.addUser = function(user) {
        user = this.allocateUser(user);
        this.users.push(user);
        return user;
    }

    Grid.prototype.removeUser = function(id) {
        var removeUser,
            removeUserI,
            self = this;

        this.users.forEach(function(user, i) {
            if (user.id === id) {
                 removeUser = user;
                 removeUserI = i;
                 return false;
            }
        });

        removeUser.points.forEach(function(point, i) {
            self.grid[point[0]][point[1]] = undefined;
            delete removeUser.points[i];
        });

        var newPoints = [];
        removeUser.points.forEach(function(point) {
            if (point !== undefined) {
                newPoints.push(point);
            }
        });
        removeUser.points = newPoints;

        self.users.splice(removeUserI, 1);
        return removeUser;
    }

    Grid.prototype.squaresTaken = function() {
        var taken = 0;
        for (var x=0; x<this.grid.length; x++) {
            for (var y=0; y<this.grid[x].length; y++) {
                if (this.grid[x][y] !== undefined) {
                    taken++;
                }
            }
        }
        return taken;
    }

    return {
        createGrid: function() {
            return new Grid();
        }
    }
});

app.service('users', function() {
    var index = 0;

    function User(username, squares) {
        this.id = index;
        this.username = username;
        this.squares = squares;
        this.points = [];
        index++;
    }

    return {
        createUser: function(username, squares) {
            return new User(username, squares);
        }
    }
});
