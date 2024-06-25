class Food {
  constructor(ss) {
    this.x = randomInt(0, cnv.width - ss);
    this.y = randomInt(0, cnv.height - ss);
    this.color = "red";
    this.squareSize = ss;
  }

  // METHODS
  draw() {
    drawRect(this.x, this.y, this.squareSize, this.squareSize, this.color);
  }
}
