
export default class Ball{
  constructor(){

  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(
      490, 160, 20, 0, Math.PI*2, false
    );
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}
