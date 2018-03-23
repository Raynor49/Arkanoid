import Ball from './ball.js';
import Paddle from './paddle.js';
import Brick from './brick.js';
export default class Game{
  constructor(){
    this.ball = new Ball({
      pos: [330,335],
      vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
      rad: 7,
      acc: 0.001
    });
    this.level = 1;
    this.speedInc = 0;
    this.lives = 1;
    this.paddle = new Paddle(130, 100);
    this.bricks = [];
    for (var i = 0; i < this.level*10; i++) {
      let color = ['yellow','red','green','orange','lightblue', 'lightgreen', 'pink', 'violet'][Math.floor(Math.random()*8)];
      this.bricks.push(new Brick([500*Math.random() + 50, 400*Math.random() + 50 ], color));
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
  }

  collisionPaddle(posX1, posX2, height){
    if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] === posX1 - 7 || this.ball.pos[0] === posX2 + 7)){
      this.ball.pos[1] = height;
      this.ball.bounce('horizontal');
    }else if ((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 14) && (this.ball.pos[0] > posX1 - 7 && this.ball.pos[0] < posX2 + 7)){
      this.ball.pos[1] = height;
      this.ball.bounce('vertical');
    }
  }

  collisionBrick(brick){
    const posX1 = brick.pos[0];
    const posX2 = brick.pos[0] + 50;
    const height = brick.pos[1];

    if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] === posX1 - 7 || this.ball.pos[0] === posX2 + 7)){
      this.ball.bounce('horizontal');
      delete this.bricks[this.bricks.indexOf(brick)];
    }else if((this.ball.pos[1] >= height && this.ball.pos[1] <= height + 16) && (this.ball.pos[0] > posX1 - 7 && this.ball.pos[0] < posX2 + 7)){
      this.ball.bounce('vertical');
      delete this.bricks[this.bricks.indexOf(brick)];
    }

  }

  loseLife(){
    if (this.ball.pos[1] > 700){
      this.lives--;
      this.ball = new Ball({
        pos: [330,335],
        vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
        rad: 7,
        acc: 0.001 + this.speedInc
      });
    }
  }

  loseGame(){
    this.speedInc = 0;
    this.level = 1;
    this.lives = 5;
    this.resetGame();
    document.getElementById('pause').click();
    document.getElementById('win-lose').innerHTML = 'GameOver!';
  }

  winGame(){
    this.speedInc += 0.001;
    this.level++;
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
    this.ball = new Ball({
      pos: [330,335],
      vel: [this.posOrNeg()*2*Math.random(),this.posOrNeg()*2*Math.random()],
      rad: 7,
      acc: 0.001 + this.speedInc
    });

    this.bricks = [];
    for (var i = 0; i < this.level*10; i++) {
      let color = ['yellow','red','green','orange','lightblue', 'lightgreen', 'pink', 'violet'][Math.floor(Math.random()*8)];
      this.bricks.push(new Brick([500*Math.random() + 50, 400*Math.random() + 50 ], color));
    }
  }

  moveObjects(){
    this.ball.move();
  }

}
