'use strict';

const FPS = 60;
const SPEED = 4;
const SPPEDOFFSET = 2;

const refs = {
  ball: document.querySelector('.bouncing-ball'),
};

function randomSpeed() {
  const speed = Math.floor(Math.random() * SPEED) + SPPEDOFFSET;
  if (Math.random() > 0.5) {
    return -speed;
  } else {
    return speed;
  }
}

function randomCoordinate(max, size) {
  return Math.floor(Math.random() * (max - size - 8) + 4);
}

function randomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

const ballData = {
  interval: Math.floor(1000 / FPS),
  speedX: randomSpeed(),
  speedY: randomSpeed(),
  ballX: randomCoordinate(window.innerWidth, refs.ball.offsetWidth),
  ballY: randomCoordinate(window.innerHeight, refs.ball.offsetHeight),
  intervalId: null,
};

function changeBall(event) {
  event.preventDefault();
  ballData.speedX = randomSpeed();
  ballData.speedY = randomSpeed();
  ballData.ballX = randomCoordinate(window.innerWidth, refs.ball.offsetWidth);
  ballData.ballY = randomCoordinate(window.innerHeight, refs.ball.offsetHeight);
  refs.ball.style.backgroundColor = randomColor();
}

refs.ball.addEventListener('click', changeBall);
refs.ball.addEventListener('touchstart', changeBall);
refs.ball.addEventListener('mousedown', changeBall);
refs.ball.addEventListener('mouseover', changeBall);

ballData.intervalId = setInterval(() => {
  ballData.ballX += ballData.speedX;
  ballData.ballY += ballData.speedY;

  refs.ball.style.left = ballData.ballX + 'px';
  refs.ball.style.top = ballData.ballY + 'px';

  if (
    (ballData.ballX + refs.ball.offsetWidth) >= (window.innerWidth - 4) ||
    (ballData.ballX <= 4)
  ) {
    ballData.speedX = -ballData.speedX;
  }

  if (
    (ballData.ballY + refs.ball.offsetHeight) >= (window.innerHeight - 4) ||
    (ballData.ballY <= 4)
  ) {
    ballData.speedY = -ballData.speedY;
  }
}, ballData.interval);
