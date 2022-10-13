const canvasWidth = 600;
const canvasHeight = 400;
let hatake;
let grass;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  hatake = new Hatake();
  hatake.masume[1][1] = new TomatoMasu();
  hatake.masume[4][6] = new NinjinMasu();
  grass = new KarappoMasu();
}

function draw() {
  background("#66ccff");
  hatake.display();
}

class Hatake {
  constructor() {
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
    this.tileSide = canvasWidth / this.masume.length;
    this.tileWidth = this.tileSide * sin(PI / 3);
    this.tileHeight = this.tileSide * 0.5; // cos(120) == 1/2
    this.x = canvasWidth / 2;
    this.y = canvasHeight - this.masume.length * this.tileHeight;
  }
  display() {
    this.masume.forEach((gyo, i) => {
      gyo.forEach((masu, j) => {
        this.drawTile(
          masu,
          this.x + (j * this.tileWidth) / 2 - (i * this.tileWidth) / 2,
          this.y +
            i * this.tileHeight +
            (j * this.tileHeight) / 2 -
            (i * this.tileHeight) / 2
        );
      });
    });
  }
  drawTile(masu, x, y) {
    if (masu === null) {
      grass.draw(x, y);
    } else {
      masu.draw(x, y);
    }
  }
}
class Masu {
  constructor(tileColor) {
    this.tileColor = tileColor;
  }
  draw(x, y) {
    fill(this.tileColor);
    quad(
      x,
      y,
      x + hatake.tileWidth / 2,
      y + hatake.tileHeight / 2,
      x,
      y + hatake.tileHeight,
      x - hatake.tileWidth / 2,
      y + hatake.tileHeight / 2
    );
  }
}
class TomatoMasu extends Masu {
  constructor() {
    super("#f00000"); // 赤
  }
}
class NinjinMasu extends Masu {
  constructor() {
    super("#f0c000"); // オレンジ
  }
}
class KarappoMasu extends Masu {
  constructor() {
    super("#00a000"); // 緑
  }
}
