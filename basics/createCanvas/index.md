---
layout: default
title: キャンバスサイズ createCanvas
permalink: /basics/createCanvas/
---
<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/hUtK97EW3jA"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<br />
[動くスケッチ・ソースコード](sketch)

Processingやp5.jsは、長方形（もしくは正方形）にものを描きます。

その正方形の横と縦の大きさを、 `createCanvas` 関数を使うことで設定します。

関数とは何かのやり方をプログラムの中でまとめたものです。 `createCanvas` とは、p5.jsで用意されている関数の名前です。この関数の中身（やること、効果など）を確認しなくてもよくて、使うことだけに慣れましょう。

関数を使う（呼び出す）時は、関数の名前の次に、関数に渡したい情報をかっこに囲います：

```js
createCanvas(横幅, 縦長);
```

👉 __ポイント：__ `createCanvas(640, 480);` を実行すると、640ドットx480ドットの横長の長方形が出現します。

## 動画の内容からの変更点など

動画では `size` 関数を使っていますが、今Studio Kuraで教えているうProcessingのバージョン（p5.js）では `createCanvas` を使う必要があります。

```js
function setup() {
  createCanvas(640, 480);
}
```

さらに、p5.jsでは `createCanvas` をこのように `setup` の中で呼ばなければなりません。「裸」では使えないので、エラーになった場合は `setup` にちゃんと入っているか確認しましょう。
