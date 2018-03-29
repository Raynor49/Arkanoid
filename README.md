# Arkanoid
It's a game where the user controls a platform which can move horizontally across the screen in order to bounce a ball into floating bricks to break them.
![Arkanoid Img](https://github.com/Raynor49/Arkanoid/blob/master/assets/ArkanoidImg.png)
You can view the live game [here](https://raynor49.github.io/Arkanoid/dist/index.html)

## Challenge
I had an interesting challenge in making the paddle move smoothly. Originally I simply subtracted or added a certain amount to the x-position of the paddle
whenever the a or d keys were pressed. However, this resulted in very disjointed movements, where the paddle would jump to its new position. My next attempt was
to have the paddle move small distances so it would be smoother, however then the user had to tap the key far too much in order to move significant distance.
My successful attempt was what you see below:
![PaddleCode](https://github.com/Raynor49/Arkanoid/blob/master/assets/PaddleCodeScreenshot.png)
I solved this problem by having the a and d keys set intervals where the paddle would move in a direction by a very small amount every 10ms.
This allowed for the paddle to move very smoothly while also being able to move quickly. I also stored the interval Ids so that when the user
chooses to switch directions I am able to clear all the opposite intervals and start creating intervals for the new direction.

## MVP

1. Be able to move the platform at the bottom.
2. Bounce the ball to break bricks
3. Background music and sound effects
4. Moving the platform faster should result in a faster moving ball
5. Hit powerups with the ball to get special abilities?

## Technologies and Libraries

I plan on just using Vanilla Javascript, HTML and CSS

## Wireframes
[Wireframe](Wireframe.png)

## Timeline
1 and 2 are the first phase, should take two days.
3 and 4 are the second phase
5 is the final phase
