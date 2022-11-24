// 正解が「右」かどうかを秘密で保存します
let migi_ka;
// ゲームの結果という文字列。「せいかい！」か「ちゃらり〜！」か、からっぽ
let screen_text = '';
// ボタンをクリックするとゲームオーバーとなり
// screen_text の文字列が2秒間表示されます
// game_over_timeがnullの場合は、まだゲームオーバーになっていないということです
// ゲームオーバーになると、game_over_timeにそのときのmillis()を保存して、
// いつゲームオーバーになったか記録します
let game_over_time = null;

function setup() {
  createCanvas(400, 400).parent("p5js_div");

  // ウェブページに出てくるようなボタンを生成させます
  let hidari = createButton('ひだり');
  // どちらかというと左におきます
  hidari.position(50, 300);
  // クリックされたらclick_hidariという関数を呼び出す（下記に定義あり）
  hidari.mousePressed(click_hidari);

  let migi = createButton('みぎ');
  // こちらは右がわにおきます
  migi.position(200, 300);
  migi.mousePressed(click_migi);

  // 次の正解をランダムで決めます：
  // Math.random()が0以上1未満の数字を出してくれるので、
  // それが0.5より小さく出た場合migi_kaがtrueになります
  // 0.5以上出る場合はfalseになります
  migi_ka = Math.random() < 0.5;
  // いずれかのボタンを押したとき、migi_kaのあたいによって
  // 正解かちゃらり〜を決めます
}
function draw() {
  if (
    // ゲームが終わった、かつ
    game_over_time !== null &&
    // ゲームが終わった時刻より2000ミリ秒経っている場合
    millis() > game_over_time + 2000
  ) {
    // ゲームオーバーの結果テキストをもう見せない
    screen_text = '';
    // 次のゲームの正解を決める
    migi_ka = Math.random() < 0.5;
    // もうゲームオーバーではない
    game_over_time = null;
  }

  background(255);
  // ゲームオーバーの文字列がある場合、見せます
  text(screen_text, 50, 50);
}

function click_hidari() {
  console.log("ひだりをおしたな");
  // ゲームがまだ終わっていない場合
  if (game_over_time === null) {
    // migi_kaがfalseの場合、正解
    if (!migi_ka) win();
    else lose();
  } else {
    // ゲームが終わってから2秒間
    // ボタンを押しても何もおきません
    console.log("おまちください");
  }
}
function click_migi() {
  console.log("みぎをおしたな");
  if (game_over_time === null) {
    // migi_kaがtrueの場合、正解
    if (migi_ka) win();
    else lose();
  } else {
    console.log("おまちください");
  }
}
// 正解のボタンを押したときに呼び出されます
function win() {
  // 「せいかい」と表示させる準備
  screen_text = "せいかい！";
  // この時点から2秒待つことになります
  game_over_time = millis();
}
function lose() {
  screen_text = "ちゃらり〜！";
  game_over_time = millis();
}
