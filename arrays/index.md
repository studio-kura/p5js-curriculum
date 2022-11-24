---
layout: default
title: 配列
permalink: /arrays/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/R2sjUmnFAJw"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

配列(はいれつ)とは、何こかの変数が一つの変数にまとまったものです。似たようなデータをまとめて扱うためにひじょうに便利なものです。

使い道がいっぱいで、例えばこういう種類の情報によく使われます：

- クラスのみんなの身長
- クラスのみんなの好きな色
- 市内にある小学校
- 飛行機に乗る客
- レシピの材料
- ゲームに出てくる敵
- ゲームで宇宙船が打つ弾
- ゲームのキャラクターの持ち物

配列はこういう形をしています：

```js
var hairetsu = [50, 150, 250, 350];
```

`hairetsu`と名付けた変数の中には、4つの数字が入っています。配列の中身は要素と言います。

```js
var iro = ['赤', '緑', '青', '黄色', '白', '黒'];
```

`iro`の中身は、みんな文字列です。実は中身のタイプを混ぜてもいいですけど、同じ種類のものの配列の方が役に立つことが多いです。

## 配列の要素

配列の要素を単独で使うときは、配列の変数名の右側に四角いかっこの中に、何番目かという数字を入れます。

```js
var hairetsu = [50, 150, 250, 350];
console.log(hairetsu[0]):
// 50 と出てきます
console.log(hairetsu[3]):
// 350 と出てきます
```

JavaScriptでは配列のインデックスが0から始まって、最後のインデックスは入れうの長さ（例では4）の1こ少ない数字になります（例では3）。

こういう方法で要素に書き込むこともできます。

```js
var hairetsu = [50, 150, 250, 350];
hairetsu[2] = '変えたよ！';
console.log(hairetsu):
// [50, 150, '変えたよ！', 350] と出てきます
```

## 配列が持つ便利な変数や関数

配列は実は`Array`というクラスのオブジェクトであり、付いてくる便利なツールを生まれつきでいっぱい持っています。

まずは配列の長さという変数を紹介しましょう。長さは、入っている要素の数です。名前は`length`（英語で「長さ」）で、こうやって確認できます。

```js
var hairetsu = [50, 150, 250, 350];
console.log(hairetsu.length):
// 4 と出てきます
```

次に紹介するのは、配列に新しい要素を加えるのに使える関数です。

```js
var hairetsu = [50, 150, 250, 350];
hairetsu.push(200);
console.log(hairetsu):
// [50, 150, 250, 350, 200] と出てきます
console.log(hairetsu.length):
// 5 と出てきます
```

## 配列の要素をまとめてループで使う

`for`と配列は、とても仲がいいです！例えば、配列のそれぞれの要素に1を足したい場合は一つずつ書いてもいいかもしれないですが：

```js
var hairetsu = [50, 150, 250, 350];
hairetsu[0] = hairetsu[0] + 1;
hairetsu[1] = hairetsu[1] + 1;
hairetsu[2] = hairetsu[2] + 1;
hairetsu[3] = hairetsu[3] + 1;
console.log(hairetsu):
// [51, 151, 251, 351] と出てきます
```

要素がいっぱいあるかもしれませんし、そもそも途中で増えたりしてプログラムを書くときは何個あるか分からなかったりします。ですので、だいたいループを使いたいと思います！

```js
var hairetsu = [50, 150, 250, 350];
for (let i=0; i<hairetsu.length; i++) {
  hairetsu[i] = hairetsu[i] + 1;
}
console.log(hairetsu):
// [51, 151, 251, 351] と出てきます
```

ループを使うことで、プログラムがみやすくなって要素を見落とすことがありません。ループと組み合わせるときこそ、配列の力を感じることができます！

ぜひ使ってみてください。