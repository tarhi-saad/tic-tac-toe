import XMark from '../sounds/xMark.mp3';
import OMark from '../sounds/oMark.mp3';
import win from '../sounds/win.mp3';
import tie from '../sounds/tie.mp3';
import lose from '../sounds/lose.mp3';
import board from '../sounds/board.mp3';
import menu from '../sounds/menu.mp3';
import swipe from '../sounds/swipe.mp3';
import bubble from '../sounds/bubble.mp3';

const audioBlock = document.createElement('div');

const soundEffects = (() => {
  const init = () => {
    audioBlock.id = 'audioBlock';
    document.body.append(audioBlock);
    audioBlock.insertAdjacentHTML('beforeend', `
      <audio id="xMark-sound"><source src="${XMark}" type="audio/mpeg"></audio>
      <audio id="oMark-sound"><source src="${OMark}" type="audio/mpeg"></audio>
      <audio id="win-sound"><source src="${win}" type="audio/mpeg"></audio>
      <audio id="tie-sound"><source src="${tie}" type="audio/mpeg"></audio>
      <audio id="lose-sound"><source src="${lose}" type="audio/mpeg"></audio>
      <audio id="board-sound"><source src="${board}" type="audio/mpeg"></audio>
      <audio id="menu-sound"><source src="${menu}" type="audio/mpeg"></audio>
      <audio id="swipe-sound"><source src="${swipe}" type="audio/mpeg"></audio>
      <audio id="bubble-sound"><source src="${bubble}" type="audio/mpeg"></audio>
    `);
  };

  const getAudioBlock = () => audioBlock;

  const playXMark = () => {
    const xAudio = document.getElementById('xMark-sound');
    xAudio.playbackRate = 2;
    xAudio.play();
  };

  const playOMark = () => {
    const oAudio = document.getElementById('oMark-sound');
    oAudio.playbackRate = 3.5;
    oAudio.play();
  };

  const playWin = () => {
    const winAudio = document.getElementById('win-sound');
    winAudio.play();
  };

  const playTie = () => {
    const tieAudio = document.getElementById('tie-sound');
    tieAudio.play();
  };

  const playLose = () => {
    const loseAudio = document.getElementById('lose-sound');
    loseAudio.playbackRate = 1.5;
    loseAudio.play();
  };

  const playBoard = () => {
    const boardAudio = document.getElementById('board-sound');
    boardAudio.playbackRate = 2;
    boardAudio.pause();
    boardAudio.currentTime = 0;
    boardAudio.play();
  };

  const playMenu = () => {
    const menuAudio = document.getElementById('menu-sound');
    menuAudio.pause();
    menuAudio.currentTime = 0;
    menuAudio.play();
  };

  const playSwipe = () => {
    const swipeAudio = document.getElementById('swipe-sound');
    swipeAudio.pause();
    swipeAudio.currentTime = 0;
    swipeAudio.play();
  };

  const playBubble = () => {
    const bubbleAudio = document.getElementById('bubble-sound');
    bubbleAudio.pause();
    bubbleAudio.currentTime = 0;
    bubbleAudio.play();
  };

  return {
    init,
    playXMark,
    playOMark,
    playWin,
    playTie,
    playLose,
    playBoard,
    playMenu,
    playSwipe,
    playBubble,
    getAudioBlock,
  };
})();

export default soundEffects;
