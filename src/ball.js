
export default class Ball{
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
