// Snake Game https://www.youtube.com/watch?v=8mRY70ot_n4 38:00

// Set Up Canvas
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
cvs.width = "400";
cvs.height = "400";

// Global Variables
let headColor = "#0070C0",
  bodyColor = "#00B0F0",
  boardColor = "#FFFFFF",
  foodColor = "#FC618D";
let FPS = 1000 / 10;
let gameLoop;
let snake = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];
let currentDirection = "";
let directionsQueue = [];
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
//Constants
const squareSize = 20;
const horizontalSq = cvs.width / squareSize;
const verticalSq = cvs.height / squareSize;
const head = { ...snake[0] };
const direction = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};
const initialSnakeLength = snake.length;
const gameOverEl = document.querySelector(".game-over");
let foodPos = createFood();
//Event Listeners
document.addEventListener("keyup", setDirection);
document.getElementById("easy-btn").addEventListener("click", easyBtnClicked);
document
  .getElementById("normal-btn")
  .addEventListener("click", normalBtnClicked);
document.getElementById("hard-btn").addEventListener("click", hardBtnClicked);
// Run Game
gameLoop = setInterval(frame, FPS);

function frame() {
  drawBoard();
  drawFood();
  moveSnake();
  drawSnake();
  renderScore();
  if (hitWall() || hitSelf()) {
    clearInterval(gameLoop);
    gameOver();
  }
}

// Draw Components
function drawBoard() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
  ctx.strokeStyle = boardColor;
  ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}
function drawSnake() {
  snake.forEach((tile, i) => {
    const color = i === 0 ? headColor : bodyColor;
    drawSquare(tile.x, tile.y, color);
  });
}

function setDirection(e) {
  const newDirection = e.key;
  const oldDirection = currentDirection;

  if (
    (newDirection === direction.LEFT && oldDirection !== direction.RIGHT) ||
    (newDirection === direction.RIGHT && oldDirection !== direction.LEFT) ||
    (newDirection === direction.UP && oldDirection !== direction.DOWN) ||
    (newDirection === direction.DOWN && oldDirection !== direction.UP)
  ) {
    directionsQueue.push(newDirection);
  }
  clearInterval(gameLoop);
  gameLoop = setInterval(frame, FPS);
}

function moveSnake() {
  const head = { ...snake[0] };

  if (directionsQueue.length) {
    currentDirection = directionsQueue.shift();
  }
  switch (currentDirection) {
    case direction.LEFT:
      head.x -= 1;
      break;
    case direction.RIGHT:
      head.x += 1;
      break;
    case direction.UP:
      head.y -= 1;
      break;
    case direction.DOWN:
      head.y += 1;
      break;
  }
  if (hasEatenFood()) {
    foodPos = createFood();
    snake.unshift(head);
  } else if (currentDirection !== "") {
    snake.pop();
    snake.unshift(head);
  }
}
function createFood() {
  let foodPos = {
    x: Math.floor(Math.random() * horizontalSq),
    y: Math.floor(Math.random() * verticalSq),
  };
  while (snake.some((tile) => tile.x === foodPos.x && tile.y === foodPos.y)) {
    foodPos = {
      x: Math.floor(Math.random() * horizontalSq),
      y: Math.floor(Math.random() * verticalSq),
    };
  }
  return foodPos;
}
function drawFood() {
  drawSquare(foodPos.x, foodPos.y, foodColor);
}
function hasEatenFood() {
  const head = snake[0];
  return foodPos.x === head.x && foodPos.y === head.y;
}
function hitWall() {
  const head = snake[0];
  return (
    head.x < 0 || head.x >= horizontalSq || head.y < 0 || head.y >= verticalSq
  );
}
function hitSelf() {
  const snakeBody = [...snake];
  const head = snakeBody.shift();
  return snakeBody.some((tile) => tile.x === head.x && tile.y === head.y);
}

function renderScore() {
  score = snake.length - initialSnakeLength;

  // Show Score
  document.getElementById("score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;
}
function gameOver() {
  highScore = Math.max(highScore, score);
  localStorage.setItem("high-score", highScore);
  document.getElementById("go-score").innerHTML = score;
  document.getElementById("go-highscore").innerHTML = highScore;
  gameOverEl.classList.remove("hide");
}

// Difficulty Buttons
function easyBtnClicked() {
  document.getElementById("easy-btn").classList.add("active");
  document.getElementById("normal-btn").classList.remove("active");
  document.getElementById("hard-btn").classList.remove("active");

  FPS = 1000 / 10;
}

function normalBtnClicked() {
  document.getElementById("easy-btn").classList.remove("active");
  document.getElementById("normal-btn").classList.add("active");
  document.getElementById("hard-btn").classList.remove("active");

  FPS = 1000 / 15;
}

function hardBtnClicked() {
  document.getElementById("easy-btn").classList.remove("active");
  document.getElementById("normal-btn").classList.remove("active");
  document.getElementById("hard-btn").classList.add("active");

  FPS = 1000 / 20;
}
