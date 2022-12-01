---
layout: default
title: 変数に数値などデータを保存して使う
permalink: /basics/variables/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/hIg95cL_6HQ"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

変数とは、数値・文字などを保存・記録できる紙切れや引き出しのようなものです。

例えば自分の身長をプログラムで使いたいとすると、このようにできます。

```js
let shincho = 165;
rect (50, 50, 100, shincho);
```

こうすると `shincho` とは165に変換され、 `rect` が描く四角の縦長さが165になります。

こう見るとあまり効率的に見えないかもしれませんが、値に名前を付けるだけでプログラムが人間に読みやすくなります。また、同じ値を何箇所かに使う時は特に便利です。

## `let` の意味

上記の例に `shincho` が2回出ていますが、最初だけ `let` が付いています。変数を命名する時は、このように先に `let` と書く必要があります。変数一つずつ `let` が1回です。それも1回目です。

## 変数の中身を変更

```js
let shincho = 165;
rect (50, 50, 100, shincho);
shincho = 190;
rect (250, 50, 100, shincho);
```

`shincho` が165の時に書いた、左の方に書かれる上記の長方形は、縦長さが165です。

その後 `shincho` の値（中身）を190に更新して、右にずらした二つ目の四角を描きます。この段階の `shincho` が190なので、二つ目の長方形の縦長さは190になります。

`let` は最初だけつけているのに注目してください。

## color 関数を使った変数定義

```js
let c = color(255, 0, 0);
```

スケッチにこうあるのですが、3つの数値を使った色を変数に保存したい時には `color` という関数を使うことができます。

この場合は `color` に三つの数値を渡して、色というものに変換してもらって、それを `c` 変数に保存しています。そうすると `c` の中身は `fill` などにそのまま使うことができます。

## 動画からの変更点

p5.jsでは、変数の型（タイプ）を指定しないで、 `int` などではなくてどの情報の種類が入っても `let` で定義します。
