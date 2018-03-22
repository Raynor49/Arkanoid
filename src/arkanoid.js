// import Ball from './ball.js';
import GameView from './game_view.js';
import Game from './game.js';
document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  // window.ctx = ctx;
});

// window.Ball = Ball;
