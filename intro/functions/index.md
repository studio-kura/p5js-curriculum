---
layout: default
title: p5.js 入門　関数
permalink: /intro/functions/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/4l93KOTxnGY"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

`setup`や`draw`関数はp5.jsが勝手に呼び出してくれるのですが、任意の関数を使ってコードをすっきりさせることができます。

今回のスケッチでは特定の色の四角を描いていますが、その四角がマウスでクリックされている場合は特定の色ではなくて黒に塗っています。

そして今回のスケッチの特徴は、その流れを関数に落としてボタンを簡単に3つ出せています。

## 関数の引数

例えば数値の100倍を計算する関数を書きましょう。

```js
function setup() {
  createCanvas(400,400);
  background(220);
  hyakubai(90);
}
function hyakubai(suuchi) {
  const kotae = suuchi * 100;
  text(kotae, 100, 100);
}
```

`setup`で90を引数に呼び出しているので、9000が画面に書かれると思います。

### 今回のbutton関数

```js
function button(x, y, s, c) {
  let bc;
  if (
    mouseX > x &&
    mouseX < x + s &&
    mouseY > y &&
    mouseY < y + s &&
    mouseIsPressed
  ) {
    bc = color(0);
  } else {
    bc = c;
  }
  fill(bc);
  rect(x, y, s, s);
}
```

今回`button`と命名した関数は、4つの引数を取ります。それだけカスタマイズできるので、使い勝手がいいと言っていいでしょう。

- `x`: 描かれるボタンのx座標
- `y`: 描かれるボタンのy座標
- `s`: 描かれるボタンの大きさ
- `c`: 描かれるボタンの色

クリックされているか判定するときは、p5.jsが用意してくれている読み込み専用定数を確認しています。

- `mouseX`: マウスの現在のx座標
- `mouseY`: マウスの現在のy座標
- `mouseIsPressed`: マウスが現在クリックされているのか(`true`)されていないのか(`false`)

## 関数の返り値

今回登場しませんが、関数は引数を取ることがあれば「答え」みたいな値を返すこともできます。

先ほどの100倍関数を、値を返すように書き換えてみましょう。

```js
function setup() {
  createCanvas(400,400);
  background(220);
  const kotae = hyakubai(90);
  text(kotae, 100, 100);
}
function hyakubai(suuchi) {
  return suuchi * 100;
}
```

このやり方の場合は`hyakubai`関数が`suuchi`という入力をとって返り値を返すだけで、実際に画面に描くのは`setup`で行われています。

必要に応じて関数の返り値も積極的に使いましょう。
