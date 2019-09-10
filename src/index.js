/**
 * * We need to organize our code:
 * Factory & Modules
 * ? How to determine whene we need one of them?
 * ==============================
 * * The status of my code:
 * - 5 Global variables
 * - 2 helper functions
 * - 2 Global event handlers
 * ==============================
 * * Content of the code:
 * ...
 * ==============================
 * * Let's define a module. We want to return an object which contain a set of behaviors & props
 * ? what sort of objects can extract from our app?
 * an object is a special type thats represent a real world variable
 * It has properties and it can do things, like a "car"
 * ? do we have this kind of object here?
 * =============================
 * ? what can do things and/or have properties in this code?
 * - board: "boardState", "isWinner()", "restart()"
 * - square: "innerHTML", is clearly a child of "board"
 * ? why do we need to manage players?
 * The idea is to have "gameBoard" & "displayController" as a Module, and "players" as a Factory
 * * In "react" we think components:
 * - every piece of UI is its own component (Class or function-stateless)
 * ? what is the flow of the game?
 * ============================
 * * Features:
 * - [X]gameboard (gameBoard)
 * - [X]players
 * - [X]Control the flow of the game
 * - [X]Render "gameboard" (gameBoard)
 * - [X]Add marks on the board (gameBoard)
 * - [X]Check "Game over"
 * - [ ]Put players names
 * - [ ]Start
 * - [X]Restart (gameBoard)
 * - [X]Display state of the game (winner, turn...) (gameBoard)
 * - [ ]Choose playing vs AI or human
 * =============================
 * ! Redesign our game in "svg" or "canvas"
 * ! Animate
 * ! Use Sass
 * TODO: X & O marks are successfully implemented. Now, let's redesign the board...
 */

import bsCustomFileInput from 'mdbootstrap/js/modules/bs-custom-file-input';
import 'mdbootstrap';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import gameBoard from './modules/gameboard';
import players from './modules/players';
import displayController from './modules/displayController';
import './style.css';

const root = document.getElementById('root');
window.bsCustomFileInput = bsCustomFileInput;

displayController.init(gameBoard, players, root);
