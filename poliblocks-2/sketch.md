---
layout: default
title: レスポンシブデザインで伸びる正方形のp5.jsスケッチを作ろう - sketch
permalink: /poliblocks-2/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)

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
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
}
```
