---
layout: default
title: p5.js入門　p5.jsを始めよう！ - sketch
permalink: /intro/introduction/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(300, 200, 100, 100);
  rect(300, 200, 50, 100);
  line(100, 50, 300, 80);
}
```
