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
});







// window.Ball = Ball;
