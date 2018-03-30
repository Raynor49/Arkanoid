import Game from './game.js';
export default class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.IntervalIds = [];
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
    this.paused = true;
  }

  draw(){
    return this.game.draw(this.ctx);
  }

  bindKeyHandlers(){
    key('a', () => { this.game.paddle.move('left'); });
    key("d", () => { this.game.paddle.move('right'); });
    key("s", () => { this.game.paddle.move('stop'); });
  }

  unbindKeyHandlers(){
    key.unbind('a');
    key.unbind('d');
    key.unbind('s');
  }

  start(){
    if (this.paused){
      this.paused = false;
      this.bindKeyHandlers();
      this.IntervalIds.push(setInterval(this.draw, 10));
      this.IntervalIds.push(setInterval(this.game.moveObjects, 10));
      document.getElementById('win-lose').innerHTML = '';
      document.getElementById('prev-score').innerHTML = '';
    }
  }

  pause(){
    this.paused = true;
    this.unbindKeyHandlers();
    this.IntervalIds.forEach( (id) => {
      clearInterval(id);
    });
  }


}
