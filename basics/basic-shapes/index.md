---
layout: default
title: ellipse rect lineを使ってロボットを作ろう！ 
permalink: /basics/basic-shapes/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/LGhXF7CeCsg"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

p5.jsでも、丸、長方形と線だけあれば、ほぼなんでも描くとができます。

- `ellipse` 関数では、丸や楕円が描けます
- `rect` 関数では、正方形や長方形が描けます
- `line` 関数では、直線が描けます

それぞれ渡す情報が決まっていますので、下記で書き方をまとめます。

## ellipse（丸）

引数として数値を4つ取ります：

- x: 丸の中心のx座標（キャンバスの左端からどれほど離れているか）
- y: 丸の中心のy座標
- w: 四角の横長（width）
- h: 四角の縦長（height）

例：xが200、yが200のところに、100x100ドットという大きさの丸を描きます。

```js
ellipse(200, 200, 100, 100);
```

ついでに：wとhが一緒になっているので円形になっています。wとhが異なる場合は、楕円になります。

## rect（四角）

引数として数値を4つ取ります：

- x: 左上の角のx座標
- y: 左上の角のy座標
- w: 四角の横長（width）
- h: 四角の縦長（height）


例：xが150、yが250のところ（左上の角）から、100x150ドットという大きさの四角を描きます。

```js
rect(150, 250, 100, 150);
```

ついでに：wとhが異なるので高方形になっています。wとhが一緒の場合は、正方形になります。

## line（線）

引数として数値を4つ取ります：

- x1: 線が始まる点のx座標
- y1: 線が始まる点のy座標
- x2: 線が終わる点のx座標
- y2: 線が終わる点のy座標

例：xが150、yが250のところから、xが50、yが300のところまでの直線を描きます。

```js
line(150, 250, 50, 300);
```
