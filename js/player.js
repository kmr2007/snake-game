class Player {
  constructor(ss) {
    this.position = [{ x: cnv.width / 2, y: cnv.height / 2 }];
    this.directionX = 1;
    this.directionY = 0;
    this.key = "";
    this.color = "blue";
    this.squareSize = ss;
  }

  // METHODS
  draw() {
    for (let i = 0; i < this.position.length; i++) {
      drawRect(
        this.position[i].x,
        this.position[i].y,
        this.squareSize,
        this.squareSize,
        this.color
      );
    }
  }

  moveSnake() {
    const px = this.position[0].x;
    const py = this.position[0].y;
    this.position.pop();
    this.position.unshift({
      x: px + this.squareSize * this.directionX,
      y: py + this.squareSize * this.directionY,
    });
  }

  eatFood(fx, fy) {
    const px = this.position[0].x;
    const py = this.position[0].y;
    const ss = this.squareSize;

    // Check Food Collision
    if (
      // Going Left
      (this.directionX === 1 &&
        px + ss >= fx &&
        px <= fx + ss &&
        py + ss > fy &&
        py < fy + ss) ||
      // Going Right
      (this.directionX === -1 &&
        px <= fx + ss &&
        px + ss >= fx &&
        py + ss > fy &&
        py < fy + ss) ||
      // Going Down
      (this.directionY === 1 &&
        px + ss >= fx &&
        px <= fx + ss &&
        py + ss > fy &&
        py < fy + ss) ||
      // Going Up
      (this.directionY === -1 &&
        px + ss >= fx &&
        px <= fx + ss &&
        py <= fy + ss &&
        py >= fy)
    ) {
      // Extend Snake
      this.position.push([
        this.position[this.position.length - 1].x + ss,
        this.position[this.position.length - 1].y + ss,
      ]);
      // Move Food
      return true;
    }
  }
}
