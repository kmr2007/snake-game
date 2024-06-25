// Canvas Setup
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 400;

// Elements
let scoreOut = document.getElementById("score-out");
let highScoreOut = document.getElementById("highScore-out");

// Create Game Object
let game = new Game();

// Draw on Window Load
window.addEventListener("load", () => {
  draw();
});

// Start game on click
cnv.addEventListener("click", () => {
  if (game.status === "start") {
    game.gameInterval = setInterval(draw, 150);
    game.status = "";
  } else if (game.status === "game-over") {
    game = new Game();
    game.gameInterval = setInterval(draw, 150);
    game.status = "";
  }
});

// Process keydown
document.addEventListener("keydown", (e) => {
  game.player.key = e.key;
});

function draw() {
  game.runLogic();
  game.drawFrame();

  // Update Scores
  scoreOut.innerHTML = game.score;
  if (localStorage.getItem("highScore") !== null) {
    highScoreOut.innerHTML = localStorage.getItem("highScore");
  }
}
