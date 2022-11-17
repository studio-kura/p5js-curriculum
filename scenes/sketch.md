---
layout: default
title: 場面 - sketch
permalink: /scenes/sketch
---
```js
// ゲームの進行状況
// 0: メニュー画面
// 1: プレイヤー待機画面
// 2: アクション画面
// 3: 結果画面
var state = 0;
// いつから撃っても失格にならないか
var utsu_jikan;
// 撃たなかった場合、いつ負けるか
var make_jikan;
// ゲームに勝てる資格
var shikaku;
// 勝つときに撃ったタイムがスコアになる
var score;

function setup() {
  createCanvas(400, 400);
  background(127);
}

function draw() {
  background(127);
  switch(state) {
    case 0:
      menu_gamen();
      break;
    case 1:
      taiki_gamen();
      break;
    case 2:
      action_gamen();
      break;
    case 3:
      kekka_gamen();
      break;
  }
}

function menu_gamen() {
  text("早 撃 ち", 180, 100);
  rect(100, 200, 200, 100);
  text("スタート", 180, 250);
}
function taiki_gamen() {
  text("「撃て」が出たらクリック", 120, 200);
  if (millis() > utsu_jikan) {
    state++;
    // action_gamenで0.2〜0.6秒を与える
    make_jikan = utsu_jikan + 200 + Math.floor(Math.random()*400);
  }
}
function action_gamen() {
  text("撃て！", 180, 200);
}
function kekka_gamen() {
  if (shikaku) {
    text("あなたの勝ち！", 120, 100);
    text("あなたのタイム: " + score/1000, 120, 130);
  } else {
    text("あなたの負け", 120, 100);
  }
  rect(100, 200, 200, 100);
  text("スタート", 180, 250);
}

function mouseClicked() {
  switch(state) {
    case 1: // taiki_gamen
      shikaku = false;
      state = 3;
      break;
    case 2: // action_gamen
      if (millis() < make_jikan) {
        score = millis() - utsu_jikan;
      } else {
        shikaku = false;
      }
      state = 3;
      break;
    default:
      if (
        mouseX > 100 && mouseX < 300
        && mouseY > 200 && mouseY < 300
      ) {
        state = 1;
        shikaku = true;
        // 撃つ時間を2〜5秒後に指定
        utsu_jikan = millis() + 2000 + Math.floor(Math.random()*3000);
      }
  }
}
```
