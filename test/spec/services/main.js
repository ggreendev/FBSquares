'use strict';

describe('Service: usersService', function() {
    beforeEach(module('sbGridApp.services'));

    var usersService;

    beforeEach(inject(function (users) {
        usersService = users;
    }));

    it('should create a user that has an id, username, and squares', function() {
        var user = usersService.createUser('test', 4);
        expect(user.id).toBeDefined();
        expect(user.username).toBeDefined();
        expect(user.squares).toBeDefined();
    });

    it('should give users different ids', function() {
        var user = usersService.createUser('test', 4);
        var user2 = usersService.createUser('test2', 4);

        expect(user2.id).toBeGreaterThan(user.id);
    });
});

describe('Service: GridService', function () {

  // load the app module
  beforeEach(module('sbGridApp.services'));

  var gridService,
    usersService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (grid, users) {
    gridService = grid;
    usersService = users;
  }));

  it('should take a User object and allocate it the correct number of squares', function () {
      var grid = gridService.createGrid();
      var user = usersService.createUser('asdf', 4);
      grid.addUser(user);
      expect(grid.users.length).toBe(1);
      expect(grid.squaresTaken()).toBe(4);
  });

  it('should return the number of squares that are allocated when requested', function() {
      var grid = gridService.createGrid();
      var user = usersService.createUser('asdf', 4);
      expect(grid.squaresTaken()).toBe(0);
      grid.addUser(user);
      expect(grid.squaresTaken()).toBe(4);
      for (var i=0; i<grid.users.length; i++) {
          var points = grid.users[i].points;
          for (var j=0; j < points.length; j++) {
              var point = points[j];
              expect(grid.grid[point[0]][point[1]]).toBe(user);
          }
      }
  });

  it('should remove a user from all points properly', function() {
      var grid = gridService.createGrid(),
          user = usersService.createUser('asdf', 4);

      user = grid.addUser(user);
      //expect(grid.squaresTaken()).toBe(user.squares);

      user = grid.removeUser(user.id);
      expect(user.points.length).toBe(0);
      expect(grid.squaresTaken()).toBe(0);
      expect(grid.users.length).toBe(0);
  });
});

