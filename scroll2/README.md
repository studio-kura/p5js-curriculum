「ゼルダの伝説のスクロール」ではこのスクロールテクニックの仕組みや作り方を説明しましたけど、これからより複雑なものにするかもしれませんので、中身を気にせず基本的に使ってもらうことにしました。その分`sketch.js`がすっきりして、設定もわかりやすくなったつもりです。

## 他人のクラスの導入

クラスは`ScreenScroller.js`ファイルで配布されているし、設定は`
set_options.js`というファイルにある関数の中で行うので、`sketch.js`を含めて3つ以上のJavaScriptファイルのプロジェクトになります。

[p5.js公式エディターでの使い方をその場で見る](https://editor.p5js.org/alecrem/sketches/i2hjFVchu)

`index.html`で全てのJavaScriptファイルを呼び出すのを忘れないように！

```html
    <script src="ScreenScroller.js"></script>
    <script src="set_options.js"></script>
    <script src="sketch.js"></script>
  </body>
</html>
```

`ScreenScroller.js`と`set_options.js`をプロジェクトに含めたら、あとは`sketch.js`で読み込んだクラスや関数を使うようにするだけです。

```js
// setup()定義前にscreenを定義
var screen;

function setup() {
  // setup()でまずスクロールを設定する
  set_options();

  // createCanvasなど通常に
}

function draw() {
  // drawの中でスクロールクラスが組む面を描かせる
  screen.draw();
}

function mousePressed () {
  // 好きなところでスクロールを開始させる
  screen.initiate_scroll();
}
```

## カスタマイズ

`set_options.js`で設定できるのはこの下のものです:

- タイルに絵文字を使うか単色の四角を使うか(デフォルト: 絵文字)
- タイルの大きさ（デフォルト: 32）
- 使う絵文字／色のパレット（サンプルあり）
- 全ての面のタイルの配置（サンプルあり）

いろいろ変えながら試してみましょう！

## これからどうなるか

縦スクロール・左右スクロールを初めて昨日を追加していく予定ですので、新しいバージョンへの乗り換えが簡単になるために、前のバージョンからゲームを作り始めた人には今の段階でScreenScrollerの導入をお願いします。

新しいプロジェクトの人にもこの前ゲームを始めた人にも、新しいサンプルから始めることをおすすめします。途中までゲームを作っている人は、まずスクロールのカスタマイズだけを合わせてから、作ったキャラクターや機能を1個ず追加していきましょう

始め方は、この二つから選べます：

- [p5.js公式エディター上のサンプルから初める](https://editor.p5js.org/alecrem/sketches/i2hjFVchu)
- [GitHubのファイルをクローンかダウンロードする](https://github.com/studio-kura/p5js-screenscroller)
