'use strict';

/* Controllers */

var pacmanControllers = angular.module('pacmanControllers', []);

pacmanControllers.controller('gameController', ['$scope', 'Cell', 'Grid', 'Pacman', function($scope, Cell, Grid, Pacman) {
    
  var cell = new Cell
  var board = new Grid
  board.factory(Cell)


  $scope.cellName = cell.name
  $scope.boardSize = board.size
  $scope.board = board

  // display(board,$scope)

// function display(board) {
//   var colName = 'col'
//   var a = 1
//   while(a < board.size) {
//     $scope[colName.valueOf()] = []
//     for(var i = 0; i < 30; i++) {
//       $scope[colName.valueOf()].push(board[a])
//       console.log($scope[colName.valueOf()])
//     }
//     a++
//     colName = colName + a.toString()
//   }
// }







 }]);


