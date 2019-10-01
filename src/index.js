/**
 * ============================
 * * Features:
 * - [X]gameboard (gameBoard)
 * - [X]players
 * - [X]Control the flow of the game
 * - [X]Render "gameboard" (gameBoard)
 * - [X]Add marks on the board (gameBoard)
 * - [X]Check "Game over"
 * - [X]Put players names
 * - [X]Start
 * - [X]Restart (gameBoard)
 * - [X]Display state of the game (winner, turn...) (gameBoard)
 * - [X]Choose playing vs AI or human
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
 * ==================================================
 * * Add Sound effects!
 * TODO: Animation & effects
 * * Different colors for 'X' & 'O', and also the 'Board'
 * ==============================================================
 * ? What should we do next?
 * * Score (see above for more details)
 * * Improve "Home" design (switch AI/Human)
 * ==========================================================
 * * Features:
 * - []Home - Add difficulty feature
 * - []Home design - choice switch (AI/Human)
 * - []Separate names
 * - []Add "Choose mark" feature
 * - []Re-design "Marks" (colors) & "winning line"
 */

import bsCustomFileInput from 'mdbootstrap/js/modules/bs-custom-file-input';
import 'mdbootstrap';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import displayController from './modules/displayController';
import './scss/main.scss';

window.bsCustomFileInput = bsCustomFileInput;

const root = document.getElementById('root');

displayController.init(root);
