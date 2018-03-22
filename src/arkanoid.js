import Ball from './ball.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");
  window.ctx = ctx;
});

window.Ball = Ball;
