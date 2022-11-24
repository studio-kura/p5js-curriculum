---
layout: default
title: ジェネレーティブアートと、p5.jsでの作り方
permalink: /poliblocks-1/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/5_2mVjleLeY"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

ジェネレーティブアートとは、ランダムを使って、同じスケッチで無数にバリエーションが出せる。
`random()` を使って、毎回違う色などが出てくるスケッチを簡単に書いてみよう。

```js
let circleColorR, circleColorG, circleColorB;
function setup() {
  createCanvas(400, 400);
  circleColorR = ~~(random()*256);
  circleColorG = ~~(random()*256);
  circleColorB = ~~(random()*256);
  console.log(circleColorR, circleColorG, circleColorB);
}

function draw() {
  background(220);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(200, 200, 200, 200);
}
```

#### このスケッチに登場する豆知識

```js
~~(random()*256)
```

p5.jsの色には0〜255の整数が使われます。`random()` の出力は0以上1未満の数値（小数点あり）になるので、まず256をかけたいですね。それから、整数にするには `Math.floor()` を使ってもいいですけど `~~` も同じ結果になるだけではなくて処理も速いらしいので、ここで使ってみました。

人のソースコードを見て勉強するときにたまに出てくる裏技みたいなものですので、使うかどうかはもちろん自分で決めますが、書いてあれば理解指定ですね。

### p5.jsでジェネレーティブNFTを作ろう！PolyBlocksの概要

[PolyBlocks](https://polyblocks.io/)という、Polygonというインフラを使ったNFTサービスがあります。そこで、p5.jsで出来たNFTを作ることができます！かっこいいのを作って、人に贈りましょう。


- PolyBlocksで自分のスケッチを登録して、一つずつのバリエーションを固めてアートNFTとして生成できる
- 一つの作品（スケッチ）あたり、生成できるNFTは1~10000枚までで、作者が作品を登録する時に決める
- 好きな作品のNFTが欲しい人は、暗号通貨のMATICを支払ってミント（NFTを生成）する
- PolyBlocksならだいたい安いです！支払ったMATICはここに行く：
  - スケッチ作者
  - PolyBlocks運営
  - Polygonブロックチェーン
- どんなバリエーションが出てくるかはランダムのため、お楽しみ！
- 出来たNFTはOpenSeaなどのNFTマーケットプレイスで取引可能で、売買されたら価格の一部スケッチの作者に入ります

### 作品をPolyBlocksに登録する前に下準備

- 生成されたそっれぞれのNFTは毎回同じ結果になってほしい
- `random()` ではなくてPolyBlocksが用意するランダム関数 `pb.random()` を使おう
  - `sketch.js` の頭にPolyBlocksのコードを貼り付けると使える
  - 他に `pb.randint(a, b)` など便利な関数もいくつか使える
  - 自分のパソコンで動かすときは毎回違う結果が見られる
  - PolyBlocksにアップしてNFTをミントすると、そのNFTがずっと変わらなくなる

#### PolyBlocksのコードをコピペしましょう

これからのコードを `sketch.js` の最初に貼り付けましょう。

```js
window.pb = {
  hash: Array(32).fill(0).map(_=>"123456789abcdefghijkmnopqrstuvwxyz"[(Math.random()*32)|0]).join("") 
};

function sfc32(hash) {
  var a = parseInt(hash.substr(0, 8), 36);
  var b = parseInt(hash.substr(8, 8), 36);
  var c = parseInt(hash.substr(16, 8), 36);
  var d = parseInt(hash.substr(24, 8), 36);
  return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
  };
}
window.pb.random = new sfc32(pb.hash);
window.pb.randrange = function(min, max) {
  return window.pb.random() * (max - min) + min;
}
window.pb.randint = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(window.pb.random() * (max - min + 1) + min);
}
```

#### PolyBlocksの関数を使いましょう

乱数は先ほどのコードで用意される関数を使って出したいですね。

```js
function setup() {
  createCanvas(400, 400);
  circleColorR = ~~(pb.random()*256);
  circleColorG = ~~(pb.random()*256);
  circleColorB = ~~(pb.random()*256);
  console.log(circleColorR, circleColorG, circleColorB);
}
```

`random()` を `pb.random()` に帰るだけでいいですけど、指定した範囲の中の整数をランダムに出す関数も用意されていて便利です。

```js
function setup() {
  createCanvas(400, 400);
  circleColorR = pb.randint(0, 255);
  circleColorG = pb.randint(0, 255);
  circleColorB = pb.randint(0, 255);
  console.log(circleColorR, circleColorG, circleColorB);
}
```

### 最後に

PolyBlocksにアップするかもしれないという作品を作り始める場合、最初にPolyBlocksのコードを貼り付けましょう。

そして、 `pb.random()` などを使ってバリエーションを出しましょう。
