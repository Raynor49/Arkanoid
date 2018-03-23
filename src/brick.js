
export default class Brick{
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
