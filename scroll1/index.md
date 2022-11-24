---
layout: default
title: ゼルダの伝説のスクロール
permalink: /scroll1/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/MqLW7TVIBsw"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

今回はファミコン、MSXなど昔のゲームでよくあった1面ごとスクロールのやり方の非膣です。
こういう感じのスクロールが採用されていて、よく知られているゲームは多分「ゼルダの伝説」ですが、用意したマップはなぜかスーパーマリオに見えます。
スーパーマリオはこれと違って滑らかスクロールですけどね。

まずは大まかな制御を説明しましょう。`draw`関数は、色々`Screen`クラスに出しているので、すっきりしていると思います。

```js
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
  // スクロールが開始する度に一度だけ行う
  if (screen.scroll_progress === 1) {
    // 現在のマップの右に行き先のマップをくっつけましょう
    screen.generate_matrix_with_two_screens();
  }
  // スクロール中の場合
  if (screen.scroll_progress !== null){
    // スクロールが完了しているなら
    // screen.colsはタイル／ブロックで数えた画面の幅です
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
```

しかしスクロールが、どのきっかけで始まるでしょうか？それは大体キャラクターが画面の端にたどり着く時ですけど、キャラクターを出していないので単純にマウスクリックにしてみました。


```js
// マウスのボタンがクリックされたとき、もしくは画面がタッチされた陶器
function mousePressed () {
  // スクロールが止まっている場合
  if (screen.scroll_progress === null) {
    // スクロールを開始させる
    screen.initiate_scroll();
  }
}
```

そして、ここからはクラスの解説を軽くしす。皆さんのスクロールなどご参考になればと思います。

`constructor`ではスクロールの制御に使う変数を初期化します。

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
```

`initialize`ではステージのマップや使うパレットの色を用意しています。

各ステージのマップは数字の2次元配列で、数字は`this.colors`という、使う色の配列の中で各タイルに使いたい色のインデックスを意味しています。

単色の四角でいきましたが、タイルマップの数字の意味は数字だけではなくてタイルシート的なものに使えると思います。

```js
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
```

`this.screen`には、実際表示させなければならない画面のマップが入っています。
2次元配列なので、ループも2個です。

```js
  // 現在のマップを表示させる
  display() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        fill(this.colors[this.screen[i][j]]);
        rect(j * this.tile_size, i * this.tile_size, this.tile_size, this.tile_size);
      }
    }
  }
```

スクロールを開始させるには、`this.scroll_progress`に数字を入れて目的地を指定するだけで十分です。

```js
  // スクロールが時始まるように設定する
  // このスケッチではマウスのクリックで誘発するが、きっかけはなんでもいい
  initiate_scroll() {
    this.scroll_to = (this.scroll_from + 1) % this.stages.length;
    this.scroll_progress = 1;
  }
```

スクロールが始まると、下のマップと目的地のマップを横並びにして、横幅2倍の`this.screen`を組みます。
p5.jsのcanvasには左側だけが見えて、画面の右端からはみ出る部分はスクロールが進むとともに見えてきます。
右側がはみ出なくなったら、スクロールが終わったということです（`drae`関数はそれに頼ってスクロールを終了させています）。

```js
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
```

スクロールを実際行うのはこの関数です。スクロール中、`draw`が回るたびに呼ばれます。
`this.screen`の1行1行の最初のタイルを取り除くのに使うのは配列の古典的な関数である`shift`です。

```js
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
```

そして`Screen`の最後の関数はスクロールの設定を解除する`finalize_scroll`です。
横幅2倍広かった`this.screen`はやっと行き先の面のマップそのものに置き換えられます。

```js
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
```

いかがだったのでしょうか？ゼルダみたいに上下左右すコロールをやってみますか？
キャラクターの位置でスクロールを制御してみますか？
みなさんのゲームを楽しみにしています！