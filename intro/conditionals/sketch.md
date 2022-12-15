---
layout: default
title: p5.js入門　条件分岐 (sketch)
permalink: /intro/conditionals/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
let result = 95;
function setup() {
  createCanvas(400, 400);
  textSize(24);
}

function draw() {
  background(220);
  if (result < 50) {
    text("頑張ってー", 100, 200);
  } else if (result > 90 && result <= 99) {
    text("すごい!素晴らしい!", 100, 200);
  } else if (result == 100) {
    text("すごすぎ天才!!!", 100, 200);
  } else {
    text("普通だね", 100, 200);
  }
}
```
