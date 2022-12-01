---
layout: default
title:  ellipse rect lineを使ってロボットを作ろう！ (sketch)
permalink: /basics/basic-shapes/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
function setup() {
  createCanvas(400, 400);
  background(255);
  ellipse(200, 200, 100, 100); //頭
  rect(150, 250, 100, 150); //体
  line(150, 250, 50, 300); //左腕
  line(250, 250, 350, 300); //右腕
  ellipse(180, 180, 20, 20); //左目
  ellipse(220, 180, 20, 20); //右目
}
```
