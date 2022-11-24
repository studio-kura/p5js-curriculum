---
layout: default
title: p5.jsでボタンを使いましょう！
permalink: /buttons/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/XqxcbUyRP4M"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

## p5jsならではのボタン

p5jsでボタン、スライダー、キーボード入力ボックスなどを生成すると、p5jsが載っているWebページにそのボタンなどが出現しますが、p5jsのcanvasの中ではありません。`createCanvas(400, 400);`を実行すると、p5jsのグラフィックはページのDOM（HTML）の`<canvas>`の中で描かれますが、ボタンなどはp5jsが描いたピクセルではなく`<canvas>`と同じくHTML要素（エレメント）になります。`<canvas>`の外で存在するので、`draw()`の毎回に描く必要がありません。

## ボタンの作り方や使い方

`createButton`を使うとボタンが出現します。`createButton`の返り値（ボタンオブジェクト）を変数に保存して設定してみましょう。

```js
// ウェブページに出てくるようなボタンを生成させます
let my_button = createButton('ボタンの中に出てくる文字列');
```

ボタンは`p5.Element`でもあるので、HTML要素として扱うためのメソッドがいっぱいあります。まずは`position()`を使ってみましょう。


```js
// みせる座標をp5jsの(0, 0)から指定します
my_button.position(100, 100);
```

次に、ボタンの上でマウスが押されたときの反応を指定しましょう。`p5.Element`のメソッドである`mousePressed()`に誘導してほしい関数の名前を渡しましょう。

```js
// クリックされたらclick_my_buttonという関数を呼び出す（要定義）
my_button.mousePressed(click_my_button);

function click_my_button() {
  console.log('ボタンを押したな！');
}
```

## 他に動画で紹介する豆知識

下記の命令で、コインを投げて表が出た(`omote===true`)か裏が出た(`omote===false`)か決められます。

```js
let omote = Math.random() < 0.5;
```

まずの解説は、`Math.random()`が0以上1未満の数字を出してくれます。半分の確率で、それが0.5より小さくなるでしょう。

上の1行を長く書けばこれと同じ効果になります。

```js
let omote;
let coin = Math.random();
if (coin < 0.5) {
  omote = true;
} else {
  omote = false;
}
```

同じ行に`=`と`<`が使われているのに違和感を感じる方がいるかもしれません。そこは、一番理解してもらえれば嬉しい箇所です。

もう一度読んでみましょう。

```js
let omote = Math.random() < 0.5;
```

この中で一番「偉い」オペレーターは`=`です。`=`の右側を計算して、その結果が`omote`という変数の値となります。

しかし`<`の計算はどう行われるでしょうか？`<`は実は、足し算・掛け算などと同じオペレーターです。ただし、`<`、`>`、`==`などの比較オペレーターの結果は整数などではなくて`boolean`になります。`true`（本当）か`false`（嘘）しか出ません。

それで、`omote`に入る値は必ず`true`か`false`になります。