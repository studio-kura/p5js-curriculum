---
layout: default
title: ゲームのいろんな場面を関数で管理してdrawをスッキリさせましょう
permalink: /scenes/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/uYNOy7TqGbE"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

## draw関数、長すぎませんか？

ゲームを作るとき、タイトル画面やゲームオーバー画面だけではなくていろんな場面があったりします。

ifなどで全てdrawに積むのは自然だと思いますけど、それぞれの関数にして、それらをdrawから呼ぶ方がわかりやすいかもしれません。

## ゲームのステート（場面？）を変数で管理しましょう

例えば、簡単なゲームを作る場合はタイトルかメニュー画面があって、アクション場面があって、ゲームオーバー画面があるとします。drawはこんなにスッキリできて、それぞれの関数が短くてわかりやすくできます。

```js
// ゲームの進行状況
// 0: メニュー画面
// 1: アクション画面
// 2: ゲームオーバー画面
var state = 0;

function draw() {
  background(127);
  switch(state) {
    case 0:
      menu_gamen();
      break;
    case 1:
      action_gamen();
      break;
    case 2:
      game_over_gamen();
      break;
  }
}
```

JavaScriptはいっぱいの関数を作るのに解くに便利な言語です！活用しましょう。

## ゲームステート切り替えの制御

しかしどうやって次の場面に進んだらいいでしょうか？2パターンを紹介します。


1\. それぞれの場面の関数の中

```js
function action_gamen() {
  if (hp < 1) { // ライフが0まで下がった場合
    state = 2; // ゲームオーバー画面に行きます
  }
}
```

2\. mouseClickedなどプレイヤー入力管理の関数の中

プレイヤー入力もdrawと同じくstateによって違う処理をします。

```js
function mouseClicked() {
  switch(state) {
    case 1: // アクション画面の場合
      // 主人公の攻撃など、アクション画面のプレイヤーのアクションを行う
      attack();
      break;
    default: // 1以外(0か2の場合)
      state = 1; // またゲームを始める
  }
}
```

## 勉強になるポイント

- できるだけ、処理を関数にわけわけしましょう
- 作る関数や変数にわかりやすい名前をつけましょう

また、Phaser.ioなど他のゲーム作成ツールを使うときに、こういうゲーム場面の管理が主流だったり、いろいろ用意してあったりしますので、理解するといい概念だと思います。
