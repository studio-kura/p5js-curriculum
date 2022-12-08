---
layout: default
title: 変数に数値などデータを保存して使う (sketch)
permalink: /intro/variables/sketch
---
<script src="sketch.js"></script>
<div id="p5js_div"></div>
<br />
[説明・動画](./)


```js
let x = 50;
let y = 200;
let s = 50;
const cx = 400;

let t = "Hello";
let c;

let start = false;

function setup() {
  createCanvas(cx, 400);
  c = color(255, 0, 0);
}

function draw() {
  background(220);
  if (start == true) {
    x++;
  }

  fill(c);
  ellipse(x, y, s, s);
  fill(0);
  text(t, 20, 20);
}

function mousePressed() {
  start = true;
}
```
