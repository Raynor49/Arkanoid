// import Ball from './ball.js';
import GameView from './game_view.js';
import Game from './game.js';
document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  gameView.pause();
  // window.ctx = ctx;
  const pause = document.getElementById('pause');
  const start = document.getElementById('start');
  pause.addEventListener("click", gameView.pause);
  start.addEventListener("click", gameView.start);
  const audio = new Audio('https://raw.githubusercontent.com/Raynor49/Arkanoid/blob/master/assets/Moon.mp3');
  audio.play();
  const music = document.getElementById('mute');
  music.addEventListener('click', () => {
    audio.muted = !audio.muted;
  });
  audio.addEventListener('ended', () => {
    audio.play();
  });
});







// window.Ball = Ball;
