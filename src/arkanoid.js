import GameView from './game_view.js';
import Game from './game.js';
document.addEventListener("DOMContentLoaded", () => {
  let canvasEl = document.getElementById('game-canvas');
  let ctx = canvasEl.getContext("2d");
  let game = new Game();
  let gameView = new GameView(game, ctx);
  gameView.pause();

  let pause = document.getElementById('pause');
  let start = document.getElementById('start');
  let restart = document.getElementById('restart');

  const instructions = document.getElementById('open-modal');
  const modal = document.getElementById('myModal');
  instructions.addEventListener("click", () => {
    modal.style.display = 'block';
  })
  
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

  pause.addEventListener("click", gameView.pause);
  start.addEventListener("click", gameView.start);
  restart.addEventListener("click", () => {
    gameView.game.loseGame();
  })

  const audio = new Audio('./assets/Moon.mp3');
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
