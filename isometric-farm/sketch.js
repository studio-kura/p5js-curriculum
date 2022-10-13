let hatake;
function setup() {
  createCanvas(400, 400);
  hatake = new Hatake();
}

function draw() {
  background(220);
  hatake.display();
}

class Hatake {
  constructor() {
    this.tileSize = 50;
    this.masume = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
  }
  display() {
    this.masume.forEach((gyo, i) => {
      gyo.forEach((retsu, j) => {
        rect(
          j * this.tileSize,
          i * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      });
    });
  }
}
