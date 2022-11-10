// これを index.html の <head> に追加します
// <script defer src="https://unpkg.com/p5.collide2d"></script>;
// 詳細: https://github.com/bmoren/p5.collide2D
const canvasWidth = 600;
const canvasHeight = 400;
let hatake;
let zaiko;
let zaikoSelector;
let secondsKeika;
const zaikoTypes = [
  { emoji: "🍅", zaikoType: "tomato" },
  { emoji: "🥕", zaikoType: "ninjin" },
  { emoji: "🍆", zaikoType: "nasu" },
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  secondsKeika = 0;
  hatake = new Hatake();
  hatake.masume[1][1] = new TomatoMasu(1, 1);
  hatake.masume[4][6] = new NinjinMasu(4, 6);
  hatake.masume[6][3] = new NasuMasu(6, 3);
  hatake.atoKarappoDeUmeru();
  zaiko = new Zaiko();
  zaikoSelector = new ZaikoSelector();
}

function draw() {
  background("#66ccff");
  const thisSecond = ~~(millis() / 1000);
  if (thisSecond > secondsKeika) {
    secondsKeika = thisSecond;
    hatake.nyoki();
  }
  hatake.display();
  zaiko.display();
  zaikoSelector.display();
}

function mouseClicked() {
  if (
    mouseY <= zaikoSelector.rectOokisa &&
    mouseX <= zaikoSelector.rectOokisa * zaikoTypes.length
  ) {
    zaikoSelector.clicked();
    return;
  }
  hatake.clicked();
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
  atoKarappoDeUmeru() {
    this.masume.forEach((gyo, i) => {
      gyo.forEach((masu, j) => {
        if (masu === null) {
          this.masume[i][j] = new KarappoMasu(i, j);
        }
      });
    });
  }
  display() {
    this.masume.forEach((gyo, i) => {
      gyo.forEach((masu, j) => {
        masu.draw(
          this.x + (j * this.tileWidth) / 2 - (i * this.tileWidth) / 2,
          this.y +
            i * this.tileHeight +
            (j * this.tileHeight) / 2 -
            (i * this.tileHeight) / 2
        );
      });
    });
  }
  nyoki() {
    this.masume.forEach((gyo) => {
      gyo.forEach((masu) => {
        if (masu === null || masu.seichoSpeed === null) return;
        if (secondsKeika < masu.seichoLast + masu.seichoSpeed) return;
        masu.seicho++;
        masu.seichoLast = secondsKeika;
      });
    });
  }
  karappoNiSuru(i, j) {
    this.masume[i][j] = new KarappoMasu(i, j);
  }
  clicked() {
    this.masume.forEach((gyo, i) => {
      gyo.forEach((masu, j) => {
        const hit = collidePointPoly(mouseX, mouseY, masu.poly);
        if (hit) this.masume[i][j].clicked();
      });
    });
  }
}
class Masu {
  constructor(i, j, tileColor) {
    this.tileColor = tileColor;
    this.started = 0; // ゲーム開始から何秒後に設置されたか
    this.seichoLast = 0; // ゲーム開始から何秒後に最後に成長したか
    this.seichoSpeed = null; // 何秒ごとに成長するか（数値が低い方が速い）
    this.seicho = null; // 現在、どこまで成長しているか
    this.kansei = 10; // どこまで成長したら完成するか
    this.emoji = "✅"; // 完成になっている時に表示される絵文字
    this.poly = null;
    this.i = i;
    this.j = j;

    const x =
      hatake.x + (j * hatake.tileWidth) / 2 - (i * hatake.tileWidth) / 2;
    const y =
      hatake.y +
      i * hatake.tileHeight +
      (j * hatake.tileHeight) / 2 -
      (i * hatake.tileHeight) / 2;
    this.setPoly([
      createVector(x, y),
      createVector(x + hatake.tileWidth / 2, y + hatake.tileHeight / 2),
      createVector(x, y + hatake.tileHeight),
      createVector(x - hatake.tileWidth / 2, y + hatake.tileHeight / 2),
    ]);
  }
  setPoly(poly) {
    this.poly = poly;
  }
  draw(x, y) {
    if (this.poly === null) return;
    const hit = collidePointPoly(mouseX, mouseY, this.poly);
    fill(hit ? "#df8" : this.tileColor);
    stroke(0);
    beginShape();
    for (const { x, y } of this.poly) vertex(x, y);
    endShape(CLOSE);

    if (this.seicho !== null) {
      textSize(hatake.tileHeight * 0.5);
      textAlign(CENTER);
      fill(0);
      let moji = this.seicho;
      if (this.seicho >= this.kansei) moji = this.emoji;
      text(moji, x, y + hatake.tileHeight * 0.7);
    }
  }
  clicked() {
    if (this.seicho === null) {
      let newMasu;
      if (zaikoSelector.selected === 0)
        newMasu = new TomatoMasu(this.i, this.j);
      else if (zaikoSelector.selected === 1)
        newMasu = new NinjinMasu(this.i, this.j);
      else if (zaikoSelector.selected === 2)
        newMasu = new NasuMasu(this.i, this.j);

      hatake.masume[this.i][this.j] = newMasu;
    }
    if (this.seicho >= this.kansei) {
      zaiko[this.zaikoType]++;
      hatake.karappoNiSuru(this.i, this.j);
    }
  }
}
class TomatoMasu extends Masu {
  constructor(i, j) {
    super(i, j, "#f00000"); // 赤
    this.seichoSpeed = 1;
    this.seicho = 0;
    this.emoji = zaikoTypes[0].emoji;
    this.zaikoType = zaikoTypes[0].zaikoType;
  }
}
class NinjinMasu extends Masu {
  constructor(i, j) {
    super(i, j, "#f08000"); // オレンジ
    this.seichoSpeed = 3;
    this.seicho = 0;
    this.emoji = zaikoTypes[1].emoji;
    this.zaikoType = zaikoTypes[1].zaikoType;
  }
}
class NasuMasu extends Masu {
  constructor(i, j) {
    super(i, j, "#c000c0"); // 紫
    this.seichoSpeed = 2;
    this.seicho = 0;
    this.emoji = zaikoTypes[2].emoji;
    this.zaikoType = zaikoTypes[2].zaikoType;
  }
}
class KarappoMasu extends Masu {
  constructor(i, j) {
    super(i, j, "#00a000"); // 緑
  }
}
class Zaiko {
  constructor() {
    this.tomato = 0;
    this.ninjin = 0;
    this.nasu = 0;
  }

  display() {
    const zaikoString =
      this.tomato + " 🍅   " + this.ninjin + " 🥕  " + this.nasu + " 🍆  ";
    const mojiTakasa = hatake.tileHeight * 0.5;
    textSize(mojiTakasa);
    textAlign(RIGHT);
    fill(0);
    text(zaikoString, canvasWidth, mojiTakasa);
  }
}
class ZaikoSelector {
  constructor() {
    this.selected = 0;
  }

  clicked() {
    this.selected = ~~(mouseX / this.rectOokisa);
  }
  display() {
    this.mojiTakasa = hatake.tileHeight * 0.5;
    this.rectOokisa = this.mojiTakasa * 1.2;
    textSize(this.mojiTakasa);
    textAlign(LEFT);
    zaikoTypes.forEach((zaikoType, i) => {
      if (i === this.selected) {
        fill("#df8");
        stroke(0);
      } else {
        fill("#00a000");
        noStroke();
      }
      rect(i * this.rectOokisa, 0, this.rectOokisa, this.rectOokisa);
      fill(0);
      text(zaikoType.emoji, i * this.rectOokisa, this.mojiTakasa);
    });
  }
}
