'use strict';

/* Services */
var pacmanServices = angular.module('pacmanServices',[])




pacmanServices.factory('Cell', [ function() {

  var Cell = function(){
  this.content = new Corridor;
  this.temporaryContent = null;
  }
  return Cell

}])

pacmanServices.factory('Corridor', [ function() {

  var Corridor = function(){
  this.name = 'available'
  }
  return Corridor

}])


pacmanServices.factory('Pacman', [ function() {

  var Pacman = function(){
  this.lifeCount = 3
  this.pointCount = 0
  this.location = 466;
  this.name = 'pacman'

};

  Pacman.prototype.loseLife = function() {
    var self = this
    self.lifeCount -=1;
  };

  Pacman.prototype.gainOnePoint = function() {
    var self = this
    self.pointCount +=1;
  };

  Pacman.prototype.moveRight = function() {
    var self = this
    self._leaveCell(self.location);
    if (self.maze.cells[self.location + 1].content instanceof Wall){
      return self.location}
    else{
      self.location +=1;
      self._enterCell(self.location)
    }
  };

  Pacman.prototype.moveLeft = function() {
    var self = this
    self._leaveCell(self.location);
     if (self.maze.cells[self.location - 1].content instanceof Wall){
      return self.location}
    else{
      self.location -=1;
      self._enterCell(self.location)
    }
  };

  Pacman.prototype.moveUp = function() {
    var self = this
    self._leaveCell(self.location);
     if (self.maze.cells[self.location - self.maze.width].content instanceof Wall){
      return self.location}
    else{
      self.location -=self.maze.width;
      self._enterCell(self.location)
    }
  };

  Pacman.prototype.moveDown = function() {
    var self = this
    self._leaveCell(self.location);
    if (self.maze.cells[self.location + self.maze.width].content instanceof Wall){
      return self.location}
    else{
      self.location += self.maze.width;
      self._enterCell(self.location)
    }
  };

  Pacman.prototype._leaveCell = function(location) {
    var self = this
    self.maze.cells[location].content = new Corridor;
  };

  Pacman.prototype._enterCell = function(location) {
    var self = this
    self._checkGhost(location);
    self._eatDot(location);
    self.maze.cells[location].content = self
  };

  Pacman.prototype._eatDot = function(location) {
    var self = this
    if(self.maze.cells[location].content instanceof Dot)
      self.pointCount +=1;
  };

  Pacman.prototype._checkGhost = function(location) {
    var self = this
    if(self.maze.cells[location].content instanceof Ghost)
      self.lifeCount -=1;
  };

  return Pacman

}])

pacmanServices.factory('Wall', [ function() {

  var Wall = function(){
  this.name = 'wall'
  }
  return Wall

}])

function Dot(){
  this.name = 'dot'
};

pacmanServices.factory('Dot', [ function() {

  var Dot = function(){
  this.name = 'dot'
  }
  return Dot

}])


pacmanServices.factory('Ghost', [ function() {

  var Ghost = function() {
    this.name = 'ghost'
    this.location = 253; 
  };

  Ghost.prototype.moveRight = function() {
    var self = this
    self._leaveCell(self.location);
    if (self.maze.cells[self.location + 1].content instanceof Wall){
      return self.location}
    else{
      self.location +=1;
      self._enterCell(self.location)
    }
  };

  Ghost.prototype.moveLeft = function() {
    var self = this
    self._leaveCell(self.location);
     if (self.maze.cells[self.location - 1].content instanceof Wall){
      return self.location}
    else{
      self.location -=1;
      self._enterCell(self.location)
    }
  };

  Ghost.prototype.moveUp = function() {
    var self = this
    self._leaveCell(self.location);
     if (self.maze.cells[self.location - self.maze.width].content instanceof Wall){
      return self.location}
    else{
      self.location -= self.maze.width;
      self._enterCell(self.location)
    }
  };

  Ghost.prototype.moveDown = function() {
    var self = this
    self._leaveCell(self.location);
    if (self.maze.cells[self.location + self.maze.width].content instanceof Wall){
      return self.location}
    else{
      self.location += self.maze.width;
      self._enterCell(self.location)
    }
  };

  Ghost.prototype._leaveCell = function(location) {
    var self = this
    self.maze.cells[location].content = self.maze.cells[location].temporaryContent;
  };

  Ghost.prototype._enterCell = function(location) {
    var self = this
    self.maze.cells[location].temporaryContent = self.maze.cells[location].content
    self.maze.cells[location].content = self;
  };

  return Ghost

}])




pacmanServices.factory('Maze', [ function() {

  var Maze = function(width, height){
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.cells = [];
  };

  Maze.prototype.generate = function() {
    var self = this
    for(var i=0; i < self.size; i++){
        self.cells.push(new Cell)
    }
  };

  Maze.prototype.addPacman = function(pacman) {
    var self = this
    self.pacman = pacman;
    self.pacman.maze = this;
  };

  Maze.prototype.place = function(object, index) {
    var self = this
    self.cells[index].content = object;
  };

  Maze.prototype.addGhost = function(ghost) {
    var self = this
    self.ghost = ghost;
    self.ghost.maze = this;
  };

  return Maze

}])


