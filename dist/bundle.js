/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brick_js__ = __webpack_require__(5);



class Game{
  constructor(){
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball_js__["a" /* default */]({
      pos: [330,335],
      vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
      rad: 7,
      acc: 0.001
    });
    this.score = 0;
    this.level = 1;
    this.speedInc = 0;
    this.highscore = 0;
    this.pingSound = new Audio('../assets/Beep1.wav');
    this.lostSound = new Audio('../assets/Shut_Down1.wav');
    this.wonSound = new Audio('../assets/Emerge4.wav');
    this.lives = 3;
    this.paddle = new __WEBPACK_IMPORTED_MODULE_1__paddle_js__["a" /* default */](130, 100);
    this.bricks = [];
    for (var i = 0; i < this.level*10; i++) {
      let color = ['yellow','red','green','orange','lightblue', 'lightgreen', 'pink', 'violet'][Math.floor(Math.random()*8)];
      this.bricks.push(new __WEBPACK_IMPORTED_MODULE_2__brick_js__["a" /* default */]([500*Math.random() + 50, 400*Math.random() + 50 ], color));
    }
    this.moveObjects = this.moveObjects.bind(this);
  }



  draw(ctx){
    ctx.clearRect(0, 0, 658, 700);
    this.paddle.draw(ctx);
    this.collisionPaddle(this.paddle.posX, this.paddle.posX + this.paddle.width, 662);
    this.ball.draw(ctx);
    this.bricks.forEach( (brick) => {
      brick.draw(ctx);
      this.collisionBrick(brick);
    });
    this.loseLife();
    if (this.lives < 1){
      this.loseGame();
    }else if(this.bricks.every( (brick) => brick === undefined)){
      this.winGame();
    }
    document.getElementById('score').innerHTML = "Score: " + this.score;
    document.getElementById('lives').innerHTML = 'Lives: ' + this.lives;
  }

  collisionPaddle(posX1, posX2, height){
    if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] === posX1 - 7 || this.ball.pos[0] === posX2 + 7)){
      this.ball.pos[1] = height;
      this.ball.bounce('horizontal');
      this.ball.vel[0] += (this.paddle.stopIntervalIdsRight.length - this.paddle.stopIntervalIdsLeft.length);
    }else if ((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 14) && (this.ball.pos[0] > posX1 - 7 && this.ball.pos[0] < posX2 + 7)){
      this.ball.pos[1] = height;
      this.ball.bounce('vertical');
      this.ball.vel[0] += (this.paddle.stopIntervalIdsRight.length - this.paddle.stopIntervalIdsLeft.length);
    }
  }

  collisionBrick(brick){
    const posX1 = brick.pos[0];
    const posX2 = brick.pos[0] + 50;
    const height = brick.pos[1];

    if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] === posX1 - 7 || this.ball.pos[0] === posX2 + 7)){
      this.pingSound.load();
      this.pingSound.play();
      this.ball.bounce('horizontal');
      this.score += 100;
      delete this.bricks[this.bricks.indexOf(brick)];
    }else if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] > posX1 - 7 && this.ball.pos[0] < posX2 + 7)){
      this.pingSound.load();
      this.pingSound.play();
      this.ball.bounce('vertical');
      this.score += 100;
      delete this.bricks[this.bricks.indexOf(brick)];
    }
  }

  loseLife(){
    if (this.ball.pos[1] > 700){
      this.lives--;
      this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball_js__["a" /* default */]({
        pos: [330,335],
        vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
        rad: 7,
        acc: 0.001 + this.speedInc
      });
      this.score -= 250;
    }
  }

  loseGame(){
    if (this.highscore < this.score) {
      this.highscore = this.score;
    }
    this.lostSound.play();
    this.speedInc = 0;
    this.level = 1;
    this.lives = 3;
    this.score = 0;
    this.resetGame();
    document.getElementById('pause').click();
    document.getElementById('win-lose').innerHTML = 'GameOver!';
    document.getElementById('highscore').innerHTML = "HighScore: " + this.highscore;
  }

  winGame(){
    this.wonSound.play();
    this.speedInc += 0.001;
    this.level++;
    this.score += 1000;
    this.resetGame();
    document.getElementById('pause').click();
    document.getElementById('win-lose').innerHTML = 'You won that round!';
  }

  posOrNeg(){
    if (Math.random() < 0.5){
      return -1;
    }else{
      return 1;
    }
  }

  resetGame(){
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball_js__["a" /* default */]({
      pos: [330,335],
      vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
      rad: 7,
      acc: 0.001 + this.speedInc
    });

    this.bricks = [];
    for (var i = 0; i < this.level*10; i++) {
      let color = ['yellow','red','green','orange','lightblue', 'lightgreen', 'pink', 'violet'][Math.floor(Math.random()*8)];
      this.bricks.push(new __WEBPACK_IMPORTED_MODULE_2__brick_js__["a" /* default */]([500*Math.random() + 50, 400*Math.random() + 50 ], color));
    }
  }

  moveObjects(){
    this.ball.move();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(0);
// import Ball from './ball.js';


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */]();
  const gameView = new __WEBPACK_IMPORTED_MODULE_0__game_view_js__["a" /* default */](game, ctx);
  gameView.pause();
  // window.ctx = ctx;
  const pause = document.getElementById('pause');
  const start = document.getElementById('start');
  pause.addEventListener("click", gameView.pause);
  start.addEventListener("click", gameView.start);
  const audio = new Audio('../assets/Moon.mp3');
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);

class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.IntervalIds = [];
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
    this.paused = true;
  }

  draw(){
    return this.game.draw(this.ctx);
  }

  bindKeyHandlers(){
    key('a', () => { this.game.paddle.move('left'); });
    key("d", () => { this.game.paddle.move('right'); });
    key("s", () => { this.game.paddle.move('stop'); });
  }

  unbindKeyHandlers(){
    key.unbind('a');
    key.unbind('d');
    key.unbind('s');
  }

  start(){
    if (this.paused){
      this.paused = false;
      this.bindKeyHandlers();
      this.IntervalIds.push(setInterval(this.draw, 10));
      this.IntervalIds.push(setInterval(this.game.moveObjects, 10));
      document.getElementById('win-lose').innerHTML = '';
    }
  }

  pause(){
    this.paused = true;
    this.unbindKeyHandlers();
    this.IntervalIds.forEach( (id) => {
      clearInterval(id);
    });
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Ball{
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.rad = options.rad;
    this.acc = options.acc;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.rad, 0, 2*Math.PI, false
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    this.collisionWall();
  }

  collisionWall(){
    if (this.pos[0] > 630){
      this.pos[0] = 630;
      this.bounce('horizontal');
    }else if (this.pos[0] < 30){
      this.pos[0] = 30;
      this.bounce('horizontal');
    }
    if (this.pos[1] < 30){
      this.pos[1] = 30;
      this.bounce('vertical');
    }
  }

  bounce(direction){
    if (direction === 'horizontal'){
      this.vel[0] = -this.vel[0];
    }else{
      this.vel[1] = -this.vel[1];
    }
  }

  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.speedUp();
  }

  speedUp(){
    if(Math.abs(this.vel[0]) < 10){
      if (this.vel[0] > 0){
        this.vel[0] += this.acc;
      }else if (this.vel[0] < 0){
        this.vel[0] -= this.acc;
      }
    }
    if(Math.abs(this.vel[1]) < 10){
      if (this.vel[1] > 0){
        this.vel[1] += this.acc;
      }else if (this.vel[1] < 0){
        this.vel[1] -= this.acc;
      }
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Paddle{
  constructor(posX, width){
    this.posX = posX;
    this.width = width;
    this.stopIntervalIdsLeft = [];
    this.stopIntervalIdsRight = [];
  }

  createCircle(ctx, pos, color, startAngle, endAngle ){
    ctx.beginPath();
    ctx.arc(
      pos, 670, 8, startAngle*Math.PI, endAngle*Math.PI, false
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx){
    this.createCircle(ctx, this.posX, 'yellow', 0.5, 1.5);
    this.createCircle(ctx, this.posX + this.width, 'yellow', 1.5, 2.5);

    ctx.fillRect(this.posX, 662, this.width, 16);
    ctx.fillStyle = 'yellow';
    ctx.strokeRect(this.posX, 662, this.width, 16);
    ctx.strokeStyle = 'black';

    this.collisionWall();
  }

  collisionWall(){
    if (this.posX + this.width > 630){
      this.stopMove();
      while (this.posX + this.width > 630){
        this.posX--;
      }
      this.leftMove();
    }else if(this.posX < 30){
      this.stopMove();
      this.posX = 30;
      this.rightMove();
    }
  }

  move(direction){
    if (direction === 'left'){
      this.leftMove();
    }else if(direction === 'right'){
      this.rightMove();
    }else{
      this.stopMove();
    }
  }

  leftMove(){
    this.stopIntervalIdsRight.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsRight = [];
    this.stopIntervalIdsLeft.push(setInterval(() => (this.posX -= 1), 10));
    this.stopIntervalIdsLeft.push(setInterval(() => (this.posX -= 1), 10));
  }

  rightMove(){
    this.stopIntervalIdsLeft.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsLeft = [];

    this.stopIntervalIdsRight.push(setInterval(() => (this.posX += 1), 10));
    this.stopIntervalIdsRight.push(setInterval(() => (this.posX += 1), 10));
  }

  stopMove(){
    this.stopIntervalIdsRight.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsRight = [];
    this.stopIntervalIdsLeft.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsLeft = [];
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Paddle;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Brick{
  constructor(pos, color){
    this.pos = pos;
    this.color = color;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 50, 16);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Brick;



/***/ })
/******/ ]);