const canvasWidth = 600;
const canvasHeight = 400;
let hatake;
let grass;
let secondsKeika;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  secondsKeika = 0;
  hatake = new Hatake();
  hatake.masume[1][1] = new TomatoMasu();
  hatake.masume[4][6] = new NinjinMasu();
  hatake.masume[6][3] = new NasuMasu();
  grass = new KarappoMasu();
}

function draw() {
  background("#66ccff");
  const thisSecond = ~~(millis() / 1000);
  if (thisSecond > secondsKeika) {
    secondsKeika = thisSecond;
    hatake.nyoki();
  }
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
  nyoki() {
    this.masume.forEach((gyo) => {
      gyo.forEach((masu) => {
        if (masu == null || masu.seichoSpeed == null) return;
        if (secondsKeika < masu.seichoLast + masu.seichoSpeed) return;
        masu.seicho++;
        masu.seichoLast = secondsKeika;
      });
    });
  }
}
class Masu {
  constructor(tileColor) {
    this.tileColor = tileColor;
    this.started = 0; // ゲーム開始から何秒後に設置されたか
    this.seichoLast = 0; // ゲーム開始から何秒後に最後に成長したか
    this.seichoSpeed = null; // 何秒ごとに成長するか（数値が低い方が速い）
    this.seicho = null; // 現在、どこまで成長しているか
    this.kansei = 10; // どこまで成長したら完成するか
    this.emoji = "✅"; // 完成になっている時に表示される絵文字
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
    if (this.seicho !== null) {
      textSize(hatake.tileHeight * 0.5);
      textAlign(CENTER);
      fill(0);
      let moji = this.seicho;
      if (this.seicho >= this.kansei) moji = this.emoji;
      text(moji, x, y + hatake.tileHeight * 0.7);
    }
  }
}
class TomatoMasu extends Masu {
  constructor() {
    super("#f00000"); // 赤
    this.seichoSpeed = 1;
    this.seicho = 0;
    this.emoji = "🍅";
  }
}
class NinjinMasu extends Masu {
  constructor() {
    super("#f08000"); // オレンジ
    this.seichoSpeed = 3;
    this.seicho = 0;
    this.emoji = "🥕";
  }
}
class NasuMasu extends Masu {
  constructor() {
    super("#c000c0"); // 紫
    this.seichoSpeed = 2;
    this.seicho = 0;
    this.emoji = "🍆";
  }
}
class KarappoMasu extends Masu {
  constructor() {
    super("#00a000"); // 緑
  }
}
