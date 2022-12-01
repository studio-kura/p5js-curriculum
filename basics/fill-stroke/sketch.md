---
layout: default
title: fillとstrokeで描いた形や線に色をつけていく (sketch)
permalink: /basics/fill-stroke/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
function setup() {
  createCanvas(400, 400);
  background(192); // 灰色
  stroke(255); // 線が白
  strokeWeight(5); // 線の太さ
  fill(216, 68, 85); // 赤
  ellipse(200, 200, 100, 100); //頭
  fill(83, 79, 237); // 青
  // 命令が上から順番に実行されて、
  // 形を描く時は最後に指定された色になります
  rect(150, 250, 100, 150); //体
  line(150, 250, 50, 300); //左腕
  line(250, 250, 350, 300); //右腕
  fill(207, 237, 79); //黄色
  ellipse(180, 180, 20, 20); //左目
  ellipse(220, 180, 20, 20); //右目
}
```
