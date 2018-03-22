
export default class Paddle{
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
  }

  rightMove(){
    this.stopIntervalIdsLeft.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsLeft = [];
    this.stopIntervalIdsRight.push(setInterval(() => (this.posX += 1), 10));
  }

  stopMove(){
    this.stopIntervalIdsRight.forEach( (id) => {
      clearInterval(id);
    });
    this.stopIntervalIdsLeft.forEach( (id) => {
      clearInterval(id);
    });
  }

}
