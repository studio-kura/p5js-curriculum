---
layout: default
title: p5.js入門　forループを使ってみよう！
permalink: /intro/loops/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/eITkTqRYPxM"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

今日紹介するのは、同じようなコードを繰り返して実行するときに書きやすく・読みやすくする概念です。forループです。

## コードの繰り返し

例えば丸を並べて書きたいとすると、どう書きますか？

```js
ellipse(20, 20, 20, 20);
ellipse(40, 20, 20, 20);
ellipse(60, 20, 20, 20);
ellipse(80, 20, 20, 20);
ellipse(100, 20, 20, 20);
ellipse(120, 20, 20, 20);
ellipse(140, 20, 20, 20);
```

`ellipse`に渡す`x`座標だけが20コずつ増えていますね。ここは変数を使うことで便利にならないでしょうか？

```js
let x = 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
x += 20;
ellipse(x, 20, 20, 20);
```

これで二行ずつ、本当に同じコードの繰り返しになりました。

## コードで表現できる繰り返しはプログラミングで効率化できる

上の例では、20から140まで、20コずつ増やした`x`座標に丸を書いていますね。それを`for`ループに任せましょう。

```js
for (x = 20; x <= 140; x += 20) {
  ellipse(x, 20, 20, 20);  
}
```

`for`の()に入れる3つの要素は:

- `x = 20`: 繰り返しの中で1回ずつ変動する変数
- `x <= 140`: 毎回中身を実行する前に確認される続ける条件（`false`になったときに`for`が完結する）
- `x += 20`: 毎回中身を実行したあと変数を変動させる命令

`for`は関数ではないので、この3つの要素は`,`ではなくて`;`でくぎります。

## 二次元ループ

ループの中にループを入れることで、例えば`x`座標だけではなくて`y`座標も回って2次元を渡って画面を丸でいっぱいにすることができます。

```js
for (i = 0; i < 21; i++) {
  for (j = 0; j < 21; j++) {
    ellipse(20 * i, 20 * j, 20, 20);  
  }
}
```

## ifとの組み合わせ

さらに、繰り返しの中は全て同じではなくてもいいです。例えば画面を丸で埋めたところを、左半分だけ黒い丸にしてみましょう。

```js
for (i = 0; i < 21; i++) {
  for (j = 0; j < 21; j++) {
    if (i < 10) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(20 * i, 20 * j, 20, 20);  
  }
}
```

このように、ループをプログラミング言語の他の要素と組み合わせることで、色々が可能になります！
