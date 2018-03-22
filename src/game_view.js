import Game from './game.js';
export default class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
  }

  draw(){
    return this.game.draw(this.ctx);
  }

  bindKeyHandlers() {
    key('a', () => { this.game.paddle.move('left'); });
    key("d", () => { this.game.paddle.move('right'); });
    key("s", () => { this.game.paddle.move('stop'); });
  }

  start(){
    alert('Welcome to Arkanoid, you know how to play');
    this.bindKeyHandlers();
    setInterval(this.draw, 10);
    setInterval(this.game.moveObjects, 10);
  }


}
