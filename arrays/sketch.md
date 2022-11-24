---
layout: default
title: 配列 - sketch
permalink: /arrays/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
// 配列（はいれつ）は、変数を何こかまとめたものです。
var hairetsuX = [50, 150, 250, 350];
var hairetsuY = [350, 250, 150, 50];
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(200);
  // 先ほどの配列を使って、入っている数字の分丸をかいてみましょう。
  // 1こ1この丸のxに、配列の中の数字を使いましょう
  ellipse(hairetsuX[0], hairetsuY[0], 30, 30);
  ellipse(hairetsuX[1], hairetsuY[1], 30, 30);
  // []の中の数字は、配列の中の何番目かということです
  // ただし、1番じゃなくて0番から始まります！

  // 画面の左上に、配列に何こ入っているか出します
  // 配列のlengthという、自動的に更新される変数は、いつも中身の数になっています
  let moji = "hairetsuX.length==" + hairetsuX.length + ", hairetsuY.length==" + hairetsuY.length
  text(moji, 10, 20);

  // でも、配列にはまだ入っていたのですね！
  // 0番と1番はもうかいたので、2番から最後までかきましょう
  for (let i=2; i<hairetsuX.length; i++) {
    ellipse(hairetsuX[i], hairetsuY[i], 30, 30);
  }
  // やっぱり0番から最後までループを使う方がいいですね！
  // 今日は簡単な方からやってみましたけど
}
// マウスをクリックされたら丸を増やす
function mousePressed() {
  // mouseXには、マウスのx座標が入っています。そこに丸を出したい
  let tsuikaX = mouseX;
  // 配列に新しい数字を追加します！push（押し付ける？）が便利です
  hairetsuX.push(tsuikaX);
  // Y座標も同じように追加します
  let tsuikaY = mouseY;
  hairetsuY.push(tsuikaY);
}
```
