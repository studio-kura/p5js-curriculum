---
layout: default
title: ゼルダの伝説のスクロール - sketch
permalink: /scroll1/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
// ゲームの背景を管理するクラス
class Screen {
  constructor(starting_stage = 0) {
    // ブロックなどを表すタイルは32ピクセルというサイズのrectで表しています
    this.tile_size = 32;
    // スクロールがまだ始まっていない時はnull、途中の時は経過タイル数
    this.scroll_progress = null;
    // スクロール元はthis.stagesの中のindexです。最初はデフォルト0です
    this.scroll_from = starting_stage;
    // スクロール先はthis.stagesの中のindexです。未定の時はnull
    this.scroll_to = null;

    // まだセットアップする変数があるけど、ステージデータなので別関数にしました
    this.initialize();

    // 行の数（タイル単位）
    this.rows = this.stages[0].length;
    // 列の数（タイル単位）
    this.cols = this.stages[0][0].length;

    // 本当に表示される現在のマップ
    // this.stagesと違って、中身がスクルールしていると変わります
    this.screen = this.stages[this.scroll_from];
  }
  // constructorから一度呼ばれる、ステージデータを読み込む関数
  initialize() {
    // 色は実際のファミコンの色を使いました: http://www.firebrandx.com/nespalette.html
    // 定数扱い
    this.colors = [
      "#c3f6f6", // 0 空色
      "#754702", // 1 茶色
      "#b3af0d", // 2 黄色
      "#027645", // 3 緑
      "#983700", // 4 赤
      "#071380", // 5 青
      "#7bc213", // 6 黄緑
    ];
    // 各ステージ（面）のマップ。数字は出したい色の this.colors でのインデックス
    // 定数扱い
    this.stages = [
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 3, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
        [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 3, 3, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
        [0, 0, 0, 3, 3, 0, 0, 1, 1, 0, 0, 2, 3, 3, 0, 0],
        [0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
        [0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
        [0, 0, 0, 3, 3, 0, 6, 0, 0, 0, 0, 0, 3, 3, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    ];
  }

  // 現在のマップを表示させる
  display() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        fill(this.colors[this.screen[i][j]]);
        rect(j * this.tile_size, i * this.tile_size, this.tile_size, this.tile_size);
      }
    }
  }

  // スクロールが時始まるように設定する
  // このスケッチではマウスのクリックで誘発するが、きっかけはなんでもいい
  initiate_scroll() {
    this.scroll_to = (this.scroll_from + 1) % this.stages.length;
    this.scroll_progress = 1;
  }

  // 2面の幅を持つマップを生成する
  generate_matrix_with_two_screens() {
    // 画面の各行
    for (var i = 0; i < this.rows; i++) {
      // 今までいた面のその行と同じになる
      this.screen[i] = this.stages[this.scroll_from][i];
      // そして、今からいく面のこの行の要素（数字）を一つずつ後ろに追加していく
      for (var j = 0; j < this.cols; j++) {
        this.screen[i].push(this.stages[this.scroll_to][i][j]);
      }
    }
  }
  // 次の面まで1タイルずつスクロールさせます
  advance_scroll() {
    // 画面の各行
    for (var i = 0; i < this.rows; i++) {
      // その行の最初（一番左の）タイルを取り除く
      this.screen[i].shift();
    }
    // 1タイル分スクロールが進んだと記録する
    this.scroll_progress ++;
  }

  finalize_scroll() {
    // しばらくスクロールを止めるように
    this.scroll_progress = null;
    // 現在のマップをそのまま行き先の面と同じにする
    this.screen = this.stages[this.scroll_to];
    // 今までの行き先が次のスクロールの原点となる
    this.scroll_from = this.scroll_to;
    // 次の行先は未定
    this.scroll_to = null;
  }
}
// 定義したクラスからオブジェクトを作ります
var screen;

function setup() {
  createCanvas(512, 448);
  screen = new Screen();
  noStroke();
}

function draw() {
  background(screen.colors[0]);
  // もし今スクロールが始まろうとしているなら
  if (screen.scroll_progress === 1) {
    // 現在のマップの右に行き先のマップをくっつけましょう
    screen.generate_matrix_with_two_screens();
  }
  // スクロール中の場合
  if (screen.scroll_progress !== null){
    // スクロールが完了しているなら
    if (screen.scroll_progress > screen.cols) {
      // スクロールの後処理を行う
      screen.finalize_scroll();
    } else {
      // スクロールを進ませる
      screen.advance_scroll();
    }
  }
  // 現在のマップを表示させる
  screen.display();
}

// マウスのボタンがクリックされたとき、もしくは画面がタッチされた陶器
function mousePressed () {
  // スクロールが止まっている場合
  if (screen.scroll_progress === null) {
    // スクロールを開始させる
    screen.initiate_scroll();
  }
}
```
