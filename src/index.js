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
 * ! Animate
 * ! Use Sass
 * TODO: Improve UX
 * ? Score feature? This feature can wait...
 * * Save and display the score (Display the names separatly to add the scrore to each one of them)
 * * To add the score you have to add the 'choose your mark' feature to give the players a fair play
 * * Add 'ties' count in the middle
 * * Save data using 'local storage' (score & names)
 * * Add 'reset score' feature & 'change name' feature
 * =================================================
 * TODO: Add 'names' feature
 * * Let players enter their names at the start of the game
 * * Add button 'Start'
 * * Add 'name fields'
 * ? Let's develop:
 * - Render 'inputs' & 'Start button' (before rendering the game board)
 * - Click 'Start' => Remove the first view, then render the 'GameBoard' (with the given names)
 * - Add 'Home button' in the 'GameBoard' view to => Remove this view, then render the 'Home' view
 * - 
 * ==================================================
 * * Implement the 'AI' feature
 * * Add an option to choose between 'Ai' and 'Human'
 * * Add Sound effects!
 * TODO: Animation & effects
 * * Win effect: add straight line show the wining combination
 * * Different colors for 'X' & 'O', and also the 'Board'
 */

import displayController from './modules/displayController';
import './style.css';

const root = document.getElementById('root');

displayController.init(root);
