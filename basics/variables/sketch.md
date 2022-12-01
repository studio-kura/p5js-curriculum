---
layout: default
title: 変数に数値などデータを保存して使う (sketch)
permalink: /basics/variables/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
function setup() {
  createCanvas(400, 400);

  let x = 100;
  let y = 300;
  let s = 50;
  let t = "hello";
  let c = color(255, 0, 0); // 赤

  fill(c);
  ellipse(x, y, s, s);
  text(t, x, 100);
}
```
