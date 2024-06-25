class Game {
  constructor() {
    // Set square size
    this.squareSize = 15;

    // Initialize player
    this.player = new Player(this.squareSize);

    // Initialize first food
    this.food = new Food(this.squareSize);

    // Initialize score and game status
    this.score = 0;
    this.newHighScore = "";
    this.status = "start";

    // Intervals
    this.gameInterval = "";
  }

  // METHODS

  checkCollisions() {
    const p = this.player.position;
    const ss = this.squareSize;

    if (
      p[0].x <= 0 ||
      p[0].x + ss >= cnv.width ||
      p[0].y <= 0 ||
      p[0].y + ss >= cnv.height
    ) {
      return true;
    }
    for (let i = 1; i < p.length; i++) {
      if (p[0].x === p[i].x && p[0].y === p[i].y) {
        return true;
      }
    }
    return false;
  }

  gameOver() {
    // Stop Snake
    this.player.directionX = 0;
    this.player.directionY = 0;
    this.status = "game-over";
    clearInterval(this.gameInterval);
  }

  processKeydownEvent(key) {
    // All arrow directions
    if (this.status !== "game-over") {
      if (key === "ArrowDown" && this.player.directionY === 0) {
        this.player.directionX = 0;
        this.player.directionY = 1;
      } else if (key === "ArrowUp" && this.player.directionY === 0) {
        this.player.directionX = 0;
        this.player.directionY = -1;
      } else if (key === "ArrowRight" && this.player.directionX === 0) {
        this.player.directionX = 1;
        this.player.directionY = 0;
      } else if (key === "ArrowLeft" && this.player.directionX === 0) {
        this.player.directionX = -1;
        this.player.directionY = 0;
      }
    }
  }

  runLogic() {
    if (this.checkCollisions() === false) {
      this.processKeydownEvent(this.player.key);
      if (this.player.eatFood(this.food.x, this.food.y)) {
        this.score++;
        this.food = new Food(this.squareSize);
      }
      this.player.moveSnake();
    } else {
      this.gameOver();
    }
  }

  drawFrame() {
    // Clear Background
    drawRect(0, 0, cnv.width, cnv.height, "black");

    // Draw Objects
    this.food.draw();
    this.player.draw();

    // Draw Other Screens
    if (this.status === "game-over") {
      this.drawGameOver();
    } else if (this.status === "start") {
      this.drawStart();
    }
  }

  drawGameOver() {
    drawText(
      "Game Over",
      cnv.width / 2,
      cnv.height / 2,
      "white",
      "48px Pixelify Sans"
    );
    drawText(
      `Score: ${this.score}`,
      cnv.width / 2,
      cnv.height / 2 + 50,
      "white",
      "24px Pixelify Sans"
    );
    drawText(
      "Click anywhere to play again",
      cnv.width / 2,
      cnv.height - 18,
      "white",
      "18px Pixelify Sans"
    );
    if (this.newHighScore) {
      drawText(
        `New High Score`,
        cnv.width / 2,
        cnv.height / 2 + 100,
        "white",
        "24px Pixelify Sans"
      );
    }
  }

  drawStart() {
    drawText(
      "Click anywhere to start",
      cnv.width / 2,
      cnv.height - 24,
      "white",
      "24px Pixelify Sans"
    );
  }
}
