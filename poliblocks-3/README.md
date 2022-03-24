---
title: PolyBlocksとp5.jsで作ったジェネレーティブアートNFTにプロパティを付けよう！
description: Properties、attributes、levels、いろんな言い方がありますけど、NFTのメタデータにはせっかくいろいろな情報が保存できるので、使ってみましょう。
youtube_id: 3qRWWj3K9IM
---

NFTによく期待されるのはメディアとタイトルだと思いますけど、他にメタデータというどの情報を入れてもいいというところがあります。（実は、NFTの画像などメディアもメタデータの一部です。）

このメタデータに、一つ一つのNFTの情報を保存するができます。例えば：

- 背景の色
- 戦闘力
- 部族
- 年齢
- テーマ

作品によって意味がないプロパティですね。ようするに好きな文字列（`String`）、数字（`Number`）やboolean型（`true`, `false`）を入れることができます。

## PolyBlocksでのプロパティの付け方

[PolyBlocksのサイトで挙げられている](https://polyblocks.io/learn/guide)例はこれです:

```js
const seed = pb.random();

pb.attributes = {
  'rarity': getRarity(seed), // string
  'age': getAge(seed), // numerical
  'isHuman': getIsHuman(seed) // boolean
}
```

肝心なところは、同じスケッチでできるそれぞれのNFTにいろいろなプロパティが振り分けられてほしいことです。見た目を `pb.random()` で決めるように、プロパティも似たようなやり方でランダムに色々あって堀井ですね。

例でそれぞれのプロパティを決める関数を見てみましょう。

```js
// レア度を文字列にして返す関数
function getRarity(seed) {
  // 5%確率でLegendaryレア度（0~0.05）
  if (seed < 0.05) { return 'Legendary' } 
  // 10%確率でEpicレア度（0.05~0.15）
  else if (seed < 0.15) { return 'Epic' }
  // 15%確率でRareレア度（0.15~0.3）
  else if (seed < 0.3) { return 'Rare' }
  // 残りの70%確率はCommonレア度（0.3~1）
  else { return 'Common' }
}

// 0から10未満の整数を年齢として返す関数
function getAge(seed) { return Math.floor(seed * 10) }

// 50%の確率でtrueかfalseをboolean型で返す関数
function getIsHuman(seed) { return seed < 0.5 }
```

最終的にNFTに入るattributesオブジェクトはこの形でしょう：

```json
{
  "rarity": "Common",
  "age": 3,
  "isHuman": false
}
```

## OpenSeaではどう見えるか

一つのNFTのプロパティはPropertiesとLevelsに分けて表示されます。PropertiesにはStringとbooleanが出てきて、NumberはLevelsに出てきます。

OpenSeaは、同じコレクションにある複数のNFTから計算してそれぞれのプロパティの比率（全体の何%がもっているか）とLevelsの数値の最大値を出してくれます。

https://opensea.io/assets/matic/0xc38cf9a386c3978bf543ec65524dc700efdd8353/18800000

また、PolyBlocksコレクションのNFT一覧表示でプロパティでフィルタリングできます。

https://opensea.io/collection/polyblocks-v1?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=rarity&search[stringTraits][0][values][0]=Rare

## 前回のスケッチにプロパティをつけてみましょう！

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

let circleColorR, circleColorG, circleColorB;
function setup() {
  createCanvas(400, 400);
  circleColorR = pb.randint(0, 255);
  circleColorG = pb.randint(0, 255);
  circleColorB = pb.randint(0, 255);
  console.log(circleColorR, circleColorG, circleColorB);
}

function draw() {
  background(220);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(200, 200, 200, 200);
}
```

この感じだったと思いますね！ここでランダムになるのは丸の色ですが、今の色の決め方では `256 * 256 * 256` 種類の色がありえるのですね。しかも、全ての可能性の出る確率が同じなので、色を2回引いたら、その二つが同じ色である確率は0.000006%よりも小さいです！

プロパティは、同じコレクションの他のNFTとかぶる方が面白いので、出てきてもいい色の数を限らせたいと思います。パレットを決めましょう！

今回は、16色のパレットを決めて、それぞれが出る確率を決めたいと思います。みんなの確率を合わせたら100になっていないといけないですね！

| % | 16進 | R, G, B | 色の名前 |
|---|---------|---------|-------|
| 1 | #000000 | 0, 0, 0 | black |
| 1 | #1D2B53 | 29, 43, 83 | dark-blue |
| 3 | #7E2553 | 126, 37, 83 | dark-purple |
| 3 | #008751 | 0, 135, 81 | dark-green |
| 3 | #AB5236 | 171, 82, 54 | brown |
| 3 | #5F574F | 95, 87, 79 | dark-grey |
| 3 | #C2C3C7 | 194, 195, 199 | light-grey |
| 3 | #FFF1E8 | 255, 241, 232 | white |
| 10 | #FF004D | 255, 0, 77 | red |
| 10 | #FFA300 | 255, 163, 0 | orange |
| 10 | #FFEC27 | 255, 236, 39 | yellow |
| 10 | #00E436 | 0, 228, 54 | green |
| 10 | #29ADFF | 41, 173, 255 | blue |
| 10 | #83769C | 131, 118, 156 | lavender |
| 10 | #FF77A8 | 255, 119, 168 | pink |
| 10 | #FFCCAA | 255, 204, 170 | light-peach |

これで一石二鳥！色を決めて、出た色をプロパティに落としたいと思います。

先ほどのPolyBlocks本家の例みたいに、色に使う `seed` （たね）を決めてから、それによって色を決めていきたいと思います。

`setup()` 定義の前にこう加えましょう。

```js
const circleSeed = pb.random();

function getRandomColor(seed) {
  if (seed < 0.01) { return 'black' }
  else if (seed < 0.02) { return 'dark-blue' }
  else if (seed < 0.05) { return 'dark-purple' }
  else if (seed < 0.08) { return 'dark-green' }
  else if (seed < 0.11) { return 'brown' }
  else if (seed < 0.14) { return 'dark-grey' }
  else if (seed < 0.17) { return 'light-grey' }
  else if (seed < 0.20) { return 'white' }
  else if (seed < 0.30) { return 'red' }
  else if (seed < 0.40) { return 'orange' }
  else if (seed < 0.50) { return 'yellow' }
  else if (seed < 0.60) { return 'green' }
  else if (seed < 0.70) { return 'blue' }
  else if (seed < 0.80) { return 'lavender' }
  else if (seed < 0.90) { return 'pink' }
  else { return 'light-peach' }
}

pb.attributes = {
  'Circle color': getRandomColor(circleSeed), // string
}
console.log(pb.attributes);
```

しかし、丸自体の色にはここで出す色を決めていなかった！色の名前と色のRGB数値を紐付けするオブジェクトを用意しましょう。これも、 `setup()` 定義の前がいいと思います。

```js
const palette = {
  "black": [0, 0, 0],
  "dark-blue": [29, 43, 83],
  "dark-purple": [126, 37, 83],
  "dark-green": [0, 135, 81],
  "brown": [171, 82, 54],
  "dark-grey": [95, 87, 79],
  "light-grey": [194, 195, 199],
  "white": [255, 241, 232],
  "red": [255, 0, 77],
  "orange": [255, 163, 0],
  "yellow": [255, 236, 39],
  "green": [0, 228, 54],
  "blue": [41, 173, 255],
  "lavender": [131, 118, 156],
  "pink": [255, 119, 168],
  "light-peach": [255, 204, 170]
};
```

そして、丸にプロパティのために決めた色が使われるように `setup()` を変えましょう。

```js
function setup() {
  createCanvas(400, 400);
  const colorRGB = palette[pb.attributes['Circle color']];
  circleColorR = colorRGB[0];
  circleColorG = colorRGB[1];
  circleColorB = colorRGB[2];
  console.log(circleColorR, circleColorG, circleColorB);
}
```

consoleに出力される色の英語の名前とcanvasに描かれる丸の色が同じだと確認できると思います。

## 乱数が足りない

しかし、一つだけのプロパティだと、全く同じNFTが出やすいので、乱数を増やしたいと思います。

それでは、背景の色を同じ方法で、同じパレットから選びましょう。この部分を更新しましょう：

```js
const seed = pb.random();
// backgroundSeedは背景を決めるもう一つの乱数です
// seedはそのまま丸の色の方に使われます
const backgroundSeed = pb.random();

function getRandomColor(seed) {
  // この関数はそのまま使い回しできますので、そのままにしてください
}

pb.attributes = {
  'Circle color': getRandomColor(seed), // string
  'Background color': getRandomColor(backgroundSeed), // string
}
console.log(pb.attributes);
```

使いたい乱数の数だけタネが必要になりますので、使いたい乱数の数だけpb.randomを使いたいと思います。

最後に、 `draw()` にある `background()` 呼び出しに、今決めた背景色を使いたいと思います：

```js
function draw() {
  const colorRGB = palette[pb.attributes['Background color']];
  background(colorRGB[0], colorRGB[1], colorRGB[2]);
```

## 数値をプロパティに使う時の注意

数値のプロパティも色と同じように、限られた選択肢から決めると、他のNFTと被りやすくなって、面白くなったりします。例えば、丸の直径に乱数を使ってみましょうか？

```js
const circleSeed = pb.random();
const backgroundSeed = pb.random();
// diameterSeedは直径に使います
const diameterSeed = pb.random();

function getRandomColor(seed) {
  // この関数はそのままにしてください
}

function getRandomDiameter(seed) {
  if (seed < 0.1) { return 400 } // 10%で全面サイズの丸
  else if (seed < 0.3) { return 100 } // 20%で一番小さい丸
  else if (seed < 0.5) { return 300 } // 20%で大きな丸
  else { return 200 } // 50%で今までのcanvasの半分のサイズ
}

pb.attributes = {
  'Circle color': getRandomColor(circleSeed), // string
  'Background color': getRandomColor(backgroundSeed), // string
  'Diameter': getRandomDiameter(diameterSeed), // number
}
console.log(pb.attributes);
```

そして、 `draw()` で丸を描く時にこの直径にしましょう。

```js
  ellipse(200, 200, pb.attributes['Diameter'], pb.attributes['Diameter']);
```

直径のために `diameterSeed` という小数点以下がすごい乱数を生成しますけど、 `getRandomDiameter` を通したら出てくるのは100, 200, 300と400だけなので、プロパティがわかりやすく、フィルタリングしやすくなると思います！
