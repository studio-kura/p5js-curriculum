---
layout: default
title: p5.js入門　条件分岐
permalink: /intro/conditionals/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/Sky63uqnXVc"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

if〜elseでは、プログラムの一部を条件付きにできます。ifは「もし」という意味で、elseは「それ以外の場合」になります。

```js
let age = 18
if (age == 18) {
  text('18歳です', 100, 200)
} else {
  text('18歳ではない', 100, 200)
}
```

## 条件

ifにここで渡す`age == 18`は今回の条件です。二つのイコールに注目しましょう。

JavaScriptというプログラミング言語では、二つの数値などが等しいか確認するときは`==`を使います。

`=`を使うのは変数などの値を決めるときです。入れ替えると、間違いを見つけるのが難しかったりしますので、注意しましょう。

### 関係演算子

`==`のように数値などを比較して`if`の条件にできる演算子を紹介します。

- `==`: 等しい
- `!=`: 等しくない（二つは、違う）
- `<`: （左の方が右の方）より小さい
- `>`: より大きい
- `<=`: 以下
- `>=`: 以上

👉 二つの数値などを関係演算子にかけると、ブーリアン型の`true`（本当）か`false`（嘘）に演算されます。

👉 `==`と`!=`は、数値だけではなくて文字列でも便利です

### 複数条件

if(これかつあれ)とか、if(これまたはあれ)のような複数条件もあります。

書き方としては`if (これ && あれ)`や`if (これ || あれ)`になります。

- `&&` かつ（両方が`true`の場合のみ、全体が`true`になる）
- `||` かつ（一つでもどれかが`true`の場合、全体が`true`になる）

```js
if (age >= 20 && age < 30) {
  text("20代です", 100, 200);
}
```

### 連続else

if〜elseは基本的に2つのパターンを何らかの変数などによって分ける仕組みですが、このページのスケッチにあるように、`else`の中でまた`if`をかけることによって3パターン以上を振り分けることができます。