!function(t){var s={};function e(i){if(s[i])return s[i].exports;var l=s[i]={i:i,l:!1,exports:{}};return t[i].call(l.exports,l,l.exports,e),l.l=!0,l.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:i})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=0)}([function(t,s,e){"use strict";e.r(s);class i{constructor(t){this.pos=t.pos,this.vel=t.vel,this.rad=t.rad,this.acc=t.acc}draw(t){t.beginPath(),t.arc(this.pos[0],this.pos[1],this.rad,0,2*Math.PI,!1),t.fillStyle="white",t.fill(),t.closePath(),this.collisionWall()}collisionWall(){this.pos[0]>630?(this.pos[0]=630,this.bounce("horizontal")):this.pos[0]<30&&(this.pos[0]=30,this.bounce("horizontal")),this.pos[1]<30&&(this.pos[1]=30,this.bounce("vertical"))}bounce(t){"horizontal"===t?this.vel[0]=-this.vel[0]:this.vel[1]=-this.vel[1]}move(){this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1],this.speedUp()}speedUp(){this.vel[0]>0?this.vel[0]+=this.acc:this.vel[0]<0&&(this.vel[0]-=this.acc),this.vel[1]>0?this.vel[1]+=this.acc:this.vel[1]<0&&(this.vel[1]-=this.acc)}}class l{constructor(t,s){this.posX=t,this.width=s,this.stopIntervalIdsLeft=[],this.stopIntervalIdsRight=[]}createCircle(t,s,e,i,l){t.beginPath(),t.arc(s,670,8,i*Math.PI,l*Math.PI,!1),t.fillStyle=e,t.fill(),t.closePath()}draw(t){this.createCircle(t,this.posX,"yellow",.5,1.5),this.createCircle(t,this.posX+this.width,"yellow",1.5,2.5),t.fillRect(this.posX,662,this.width,16),t.fillStyle="yellow",t.strokeRect(this.posX,662,this.width,16),t.strokeStyle="black",this.collisionWall()}collisionWall(){if(this.posX+this.width>630){for(this.stopMove();this.posX+this.width>630;)this.posX--;this.leftMove()}else this.posX<30&&(this.stopMove(),this.posX=30,this.rightMove())}move(t){"left"===t?this.leftMove():"right"===t?this.rightMove():this.stopMove()}leftMove(){this.stopIntervalIdsRight.forEach(t=>{clearInterval(t)}),this.stopIntervalIdsRight=[],this.stopIntervalIdsLeft.push(setInterval(()=>this.posX-=1,10)),this.stopIntervalIdsLeft.push(setInterval(()=>this.posX-=1,10))}rightMove(){this.stopIntervalIdsLeft.forEach(t=>{clearInterval(t)}),this.stopIntervalIdsLeft=[],this.stopIntervalIdsRight.push(setInterval(()=>this.posX+=1,10)),this.stopIntervalIdsRight.push(setInterval(()=>this.posX+=1,10))}stopMove(){this.stopIntervalIdsRight.forEach(t=>{clearInterval(t)}),this.stopIntervalIdsLeft.forEach(t=>{clearInterval(t)})}}class h{constructor(t,s){this.pos=t,this.color=s}draw(t){t.beginPath(),t.rect(this.pos[0],this.pos[1],50,16),t.fillStyle=this.color,t.fill(),t.closePath()}}document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("game-canvas").getContext("2d"),s=new class{constructor(t,s){this.game=t,this.ctx=s,this.draw=this.draw.bind(this),this.IntervalIds=[],this.pause=this.pause.bind(this),this.start=this.start.bind(this),this.paused=!0}draw(){return this.game.draw(this.ctx)}bindKeyHandlers(){key("a",()=>{this.game.paddle.move("left")}),key("d",()=>{this.game.paddle.move("right")}),key("s",()=>{this.game.paddle.move("stop")})}unbindKeyHandlers(){key.unbind("a"),key.unbind("d"),key.unbind("s")}start(){this.paused&&(this.paused=!1,this.bindKeyHandlers(),this.IntervalIds.push(setInterval(this.draw,10)),this.IntervalIds.push(setInterval(this.game.moveObjects,10)),document.getElementById("win-lose").innerHTML="")}pause(){this.paused=!0,this.unbindKeyHandlers(),this.IntervalIds.forEach(t=>{clearInterval(t)})}}(new class{constructor(){this.ball=new i({pos:[330,335],vel:[2*this.posOrNeg()*Math.random(),2*this.posOrNeg()*Math.random()],rad:7,acc:.001}),this.level=1,this.speedInc=0,this.lives=1,this.paddle=new l(130,100),this.bricks=[];for(var t=0;t<10*this.level;t++){let t=["yellow","red","green","orange","lightblue","lightgreen","pink","violet"][Math.floor(8*Math.random())];this.bricks.push(new h([500*Math.random()+50,400*Math.random()+50],t))}this.moveObjects=this.moveObjects.bind(this)}draw(t){t.clearRect(0,0,658,700),this.paddle.draw(t),this.collisionPaddle(this.paddle.posX,this.paddle.posX+this.paddle.width,662),this.ball.draw(t),this.bricks.forEach(s=>{s.draw(t),this.collisionBrick(s)}),this.loseLife(),this.lives<1?this.loseGame():this.bricks.every(t=>void 0===t)&&this.winGame()}collisionPaddle(t,s,e){this.ball.pos[1]>=e&&this.ball.pos[1]<=e+16&&(this.ball.pos[0]===t-7||this.ball.pos[0]===s+7)?(this.ball.pos[1]=e,this.ball.bounce("horizontal")):this.ball.pos[1]>=e&&this.ball.pos[1]<=e+14&&this.ball.pos[0]>t-7&&this.ball.pos[0]<s+7&&(this.ball.pos[1]=e,this.ball.bounce("vertical"))}collisionBrick(t){const s=t.pos[0],e=t.pos[0]+50,i=t.pos[1];this.ball.pos[1]>=i&&this.ball.pos[1]<=i+16&&(this.ball.pos[0]===s-7||this.ball.pos[0]===e+7)?(this.ball.bounce("horizontal"),delete this.bricks[this.bricks.indexOf(t)]):this.ball.pos[1]>=i&&this.ball.pos[1]<=i+16&&this.ball.pos[0]>s-7&&this.ball.pos[0]<e+7&&(this.ball.bounce("vertical"),delete this.bricks[this.bricks.indexOf(t)])}loseLife(){this.ball.pos[1]>700&&(this.lives--,this.ball=new i({pos:[330,335],vel:[2*this.posOrNeg()*Math.random(),2*this.posOrNeg()*Math.random()],rad:7,acc:.001+this.speedInc}))}loseGame(){this.speedInc=0,this.level=1,this.lives=5,this.resetGame(),document.getElementById("pause").click(),document.getElementById("win-lose").innerHTML="GameOver!"}winGame(){this.speedInc+=.001,this.level++,this.resetGame(),document.getElementById("pause").click(),document.getElementById("win-lose").innerHTML="You won that round!"}posOrNeg(){return Math.random()<.5?-1:1}resetGame(){this.ball=new i({pos:[330,335],vel:[2*this.posOrNeg()*Math.random(),2*this.posOrNeg()*Math.random()],rad:7,acc:.001+this.speedInc}),this.bricks=[];for(var t=0;t<10*this.level;t++){let t=["yellow","red","green","orange","lightblue","lightgreen","pink","violet"][Math.floor(8*Math.random())];this.bricks.push(new h([500*Math.random()+50,400*Math.random()+50],t))}}moveObjects(){this.ball.move()}},t);s.pause();const e=document.getElementById("pause"),o=document.getElementById("start");e.addEventListener("click",s.pause),o.addEventListener("click",s.start)})}]);