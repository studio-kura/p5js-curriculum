---
layout: default
title: p5.js入門　動き（1）
permalink: /intro/animation/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dVaS5_yG0O4"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

前回はxをずらしながら7つの丸を並べましたが、似たようなやり方で一つの丸を動かすことができます。x座標を変えながら描いていけば、動いているように見えます。

`draw`関数がずっと繰り返しで実行されますが、毎回描く形の座標を変えていくと「動かす」ことができます。

```js
let x = 100;
let y = 200;
let s = 30;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  x += 1;
  ellipse(x, y, s, s);
}
```

`draw`が回るたびに`background`関数が背景を塗りつぶしてくれるので、一番最近も丸しか見えません。

## 跳ね返るようにする

上のコードでは、丸が右端に消えてしまします。代わりに跳ね返ってもらいましょう！

前は`x`に1を足していたのです。速度は1でしたね！`draw`が回るたびに右に1ずれていきます。

跳ね返って左にいくとくは1を足すのではなくて引きたいので、その場合は速度を-1にしたいと思います。

`x`に足していくのは1だったり-1だったりするわけですので、変数を使いましょう。

```js
let x = 100;
let y = 200;
let s = 30;

let speedX = 1;

function setup() {
  createCanvas(400, 400);
  noStroke();
}
function draw() {
  background(0, 30);

  x = x + speedX;
  if (x > width || x < 0) {
    speedX = speedX * -1;
  }
  ellipse(x, y, s, s);
}
```

`if`に注目しましょう！`x`が右端(`width`)より右、もしくは左端(`0`)より左に行っている場合は、速度をはんってんさせます。

右に向かって動いていた場合は`1 * (-1)`で`-1`になって、左に行っていた場合は`-1 * (-1)`で`1`になります。それで跳ね返るようになると思います。

## 2次元で動かす

このページのスケッチでは、`speedY`も設定して四方に動く丸を実装しています。

`background`を半透明にすることで、丸が辿った軌跡を残すことができました。
