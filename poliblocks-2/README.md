---
title: レスポンシブデザインで伸びる正方形のp5.jsスケッチを作ろう
description: ジェネレーティブアートNFTに便利な、レスポンシブ正方形の中で作品を表示させる方法を紹介します！
youtube_id: b99s4Tk1t-g
---

普段は `createCanvas(400, 400)` などを使ってスケッチの大きさをピクセリ単位で指定したりしますけど、スケッチを見ているユーザーの画面の中で許される領域を全て使いたい時があります。そういう時に便利なのは、p5.jsが用意してくれている `windowWidth, windowHeight` という名前の変数です。

`mouseX, mouseY` なら使ったことがある人が多いと思います。常にマウスの位置で更新されている変数ですね。 `windowWidth, windowHeight` の場合は、今スケッチが載っているウェブページの横幅と縦長さが常に更新されている、読み込み専用の変数です。

このように使ったら、スケッチがページ全体というサイズになります：

```js
createCanvas(windowWidth, windowHeight);
```

## 今回の目的

NFTを作るときなどいろんな場面で、スケッチがけっきょくどんなサイズで見てもらえるかわからないので、3つの対策をしておきたいと思います。

1. ウインドウのサイズを変えたり、端末を横向きにしてもキャンバスのサイズは自動で更新されて欲しい
2. ウインドウ／画面が正方形になっていない時、余白をつけて真ん中に出したい
3. スケッチの中身が画面一杯に多くき／小さくなってほしい

## 1. ウインドウのサイズが変わる時にスケッチのサイズも更新

`mousePressed()` などと同じように、ぼくたちが作ったらp5.jsが呼び出してくれる関数がいっぱいあります。今日使いたいのは `resizeCanvas()` です。スケッチの中でこの下のようにこの関数を定義したら、スケッチがずっとページ全体というサイズになるでしょう：

```js
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## 2. 正方形＋余白

スケッチがずっと画面全体になっているのはいいけど、スケッチの比率を固めたいときがありますね。縦横の比率は何にでも指定できますが、ここでは単純に正方形にしたいと思います。4:3、16:9などの比率にしたい人は応用してみてください。

それでは、幅が `sqSide` の正方形を画面の真ん中に出して、その中だけで描きたいと思います。

ここで用意するグローバル変数は：

```js
let offsetX, offsetY, sqSide;
```

- `offsetX`: スケッチの中で、正方形が出てくる`x`座標
- `offsetY`: スケッチの中で、正方形が出てくる`y`座標
- `sqSide`: その正方形の横幅==縦長さ==辺の長さ

まずは、ウインドウのサイズが変わるたびにこの三つを更新したいと思います。 `windowResized()` に加えます：

```js
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 正方形の幅は、横長の画面のとき、画面の縦長さに決定
  // 縦長の画面のとき、画面の横幅に決定
  // いつもその二つの中で小さい方を撮りたいので、 min() を使う
  sqSide = min(windowHeight, windowWidth);
  // 横長の画面の場合、正方形を描いて余った横幅の半分だけ、
  // その正方形を右にずらして描くこと
  offsetX = ~~((windowWidth - sqSide) / 2);
  // 横長の画面の場合は、余った縦長さの半分だけ正方形を下にずらして描くこと
  offsetY = ~~((windowHeight - sqSide) / 2);
}
```

これは `setup()` の中でも1回やりたいですね。コードがダブってほしくないので `setup()` の中で手動で `windowResized()` を呼びましょう。

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
  circleColorR = ~~(random()*256);
  circleColorG = ~~(random()*256);
  circleColorB = ~~(random()*256);
  windowResized();
}
```

それでは、正方形を描きましょう！

```js
function draw() {
  // 余白の色は白に指定
  background(255);
  // push(); translate から pop() までのコードは、
  // offsetX などずらして描いていることを気にせずに、
  // 0, 0 から描くことができます
  push();
  translate(offsetX, offsetY);
  // 分かりやすいように「この中で書きたい」正方形の部分にも色をつけます
  fill(222);
  rect(0, 0, sqSide, sqSide);
  // 前回から引き継いだ、乱数でできた色の丸
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(200, 200, 200, 200);
  pop();
}
```

## スケッチの中身が画面一杯に多くき／小さくなってほしい

正方形が伸びたり縮んだりしても、その中の丸が `200` のままですね。それも正方形と一緒に伸びて欲しいですね！

位置、大きさは全部 `sqSide` の割合で指定していきましょう。

```js
ellipse(sqSide/2, sqSide/2, sqSide/2, sqSide/2);
```

## 先生のお手本

前回の「ジェネレーティブアートと、p5.jsでの作り方」で紹介したPolyBlocks.jsの乱数関数などをここでまた導入すると、少し工夫して自分の作品にすれば、立派なジェネレーティブアートNFTになるのではないでしょうか？

```js
let offsetX, offsetY, sqSide;
let circleColorR, circleColorG, circleColorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleColorR = ~~(random()*256);
  circleColorG = ~~(random()*256);
  circleColorB = ~~(random()*256);
  console.log(windowWidth, windowHeight);
  windowResized();
}

function draw() {
  background(255);
  push();
  translate(offsetX, offsetY);
  fill(222);
  rect(0, 0, sqSide, sqSide);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(sqSide/2, sqSide/2, sqSide/2, sqSide/2);
  pop();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = ~~((windowWidth - sqSide) / 2);
  offsetY = ~~((windowHeight - sqSide) / 2);
}
```
