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

  start(){
    setInterval(this.draw, 10);
    setInterval(this.game.moveObjects, 10);
  }


}
