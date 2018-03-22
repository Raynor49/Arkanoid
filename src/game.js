import Ball from './ball.js';

export default class Game{
  constructor(){
    this.ball = new Ball({
      pos: [330,335],
      vel: [2,0],
      rad: 7
    });
    this.moveObjects = this.moveObjects.bind(this);
  }

  draw(ctx){
    ctx.clearRect(0, 0, 658, 700);
    this.ball.draw(ctx);
  }

  moveObjects(){
    this.ball.move();
  }

}
