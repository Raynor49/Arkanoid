
export default class Ball{
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.rad = options.rad;
  }

  draw(ctx){
    console.log('ball draw');
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, false
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    if (this.pos[0] > 630){
      this.bounce('horizontal');
    }else if (this.pos[0] < 30){
      this.bounce('horizontal');
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

    if (this.vel[0] > 0){
      this.vel[0] += 0.003;
    }else if (this.vel[0] < 0){
      this.vel[0] -= 0.003;
    }

    if (this.vel[1] > 0){
      this.vel[1] += 0.003;
    }else if (this.vel[1] < 0){
      this.vel[1] -= 0.003;
    }
  }

}
