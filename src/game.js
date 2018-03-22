import Ball from './ball.js';
import Paddle from './paddle.js';

export default class Game{
  constructor(){
    this.ball = new Ball({
      pos: [330,335],
      vel: [-2,-1],
      rad: 7
    });
    this.paddle = new Paddle(130, 100);
    this.moveObjects = this.moveObjects.bind(this);
  }

  draw(ctx){
    ctx.clearRect(0, 0, 658, 700);
    this.paddle.draw(ctx);
    this.collisionPaddle(this.paddle.posX, this.paddle.posX + this.paddle.width, 662);
    this.ball.draw(ctx);
  }

  collisionPaddle(posX1, posX2, height){
    if ((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] >= posX1 && this.ball.pos[0] <= posX2)){
      this.ball.bounce('vertical');
    }
  }

  moveObjects(){
    this.ball.move();
  }

}
