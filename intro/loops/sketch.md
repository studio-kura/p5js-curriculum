---
layout: default
title: p5.js入門　forループを使ってみよう！ (sketch)
permalink: /intro/loops/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
const x = 20;
const y = 20;
const s = 20;

let r = 0;

function setup() {
  createCanvas(400, 400);
  strokeWeight(5);
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      r = int(random(2));
      if (r == 0) {
        line(x * i, y * j, x + s * i, y + s * j);
      } else {
        line(x + s * i, y * j, x * i, y + s * j);
      }
    }
  }
}
```
