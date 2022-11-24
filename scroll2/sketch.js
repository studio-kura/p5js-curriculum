
// この関数の内容を変えるだけで自分のゲームに使えます！
// 色々なオプションを変えてください
const set_options = () => {
  // ブロックなどを表すタイルは32ピクセルというサイズのrectで表しています
  const tile_size = 32;

  // tilesに色の文字列か絵文字を使うことができます
  // tiles配列とタイル一つを描く関数tile_draw_functionを新しく作ることで
  // 新しいグラフィックモードを作るのも可能

  // 色は実際のファミコンの色を使いました: http://www.firebrandx.com/nespalette.html
  // 定数扱い
  const sample_color_tiles = [
    "#c3f6f6", // 0 空色
    "#754702", // 1 茶色
    "#b3af0d", // 2 黄色
    "#027645", // 3 緑
    "#983700", // 4 赤
    "#071380", // 5 青
    "#7bc213", // 6 黄緑
  ];
  const sample_emoji_tiles = [
    " ",
    "📦",
    "🎁",
    "📗",
    "👨‍🔧",
    "💦",
    "🐢",
  ];

  // 一つ一つのタイルを描く関数。
  // 四角バージョン
  const drawSquare = (i, j, tile='#000000', size=32) => {
    fill(tile);
    rect(j * size, i * size, size, size);
  };
  // 絵文字バージョン
  const drawEmoji = (i, j, tile='⛰', size=32) => {
    textSize(size);
    text(tile, j * size, i * size, size, size);
  };

  // この下の`tile_engine`は一つだけ定義できます
  // 四角か絵文字をえらんで、他はコメントにしてください

  // タイルに単色の四角を使う場合
  // const tile_engine = {
  //   tiles: sample_color_tiles,
  //   tile_draw_function: drawSquare
  // };
  // タイルに絵文字を使う場合
  const tile_engine = {
    tiles: sample_emoji_tiles,
    tile_draw_function: drawEmoji
  };

  // 各ステージ（面）のマップ。数字は出したい色の tiles でのインデックス
  // 定数扱い
  const stages = [
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    ],
    [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    ],
    [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ];

  // 全てのステージの位置関係を表すマップ
  // 数字は`stages`の中の各ステージのインデックス
  // `stages[0]`は最初に出てくるステージとされます
  const scroll_map = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
  ];

  // この上の設定で、インスタンスを初期化！
  screen = new ScreenScroller(tile_engine.tile_draw_function, scroll_map, tile_size, tile_engine.tiles, stages);
};


// ゲームの背景を管理するクラス
// ここより下のコードを編集しなくてもいろいろカスタマイズができます
class ScreenScroller {
  constructor(tile_draw_function, scroll_map = [0, 1], tile_size=32, tiles=[], stages=[]) {
    this.tile_draw_function = tile_draw_function;
    this.scroll_map = scroll_map;
    this.tile_size = tile_size;
    this.tiles = tiles;
    this.stages = stages;

    // スクロールがまだ始まっていない時はnull、途中の時は経過タイル数
    this.scroll_progress = null;
    // スクロール元はthis.stagesの中のindexです。最初はデフォルト0です
    this.current_stage = 0;
    // スクロール先はthis.stagesの中のindexです。未定の時はnull
    this.scroll_to = null;
    this.direction = null;

    // 行の数（タイル単位）
    this.rows = this.stages[0].length;
    // 列の数（タイル単位）
    this.cols = this.stages[0][0].length;

    // 本当に表示される現在のマップ
    // this.stagesと違って、中身がスクルールしていると変わります
    this.screen = this.stages[this.current_stage].slice(0);
  }

  // スケッチのdraw関数で呼び出される関数
  // スクロールの流れを制御する
  draw() {
    // もし今スクロールが始まろうとしているなら
    if (screen.scroll_progress === 1) {
      // 現在のマップの右に行き先のマップをくっつけましょう
      screen.generate_matrix_with_two_screens();
    }
    // スクロール中の場合
    if (screen.scroll_progress !== null){
      // スクロールが完了しているなら
      if (screen.scroll_progress > screen.cols) {
        // スクロールの後処理を行う
        screen.finalize_scroll();
      } else {
        // スクロールを進ませる
        screen.advance_scroll();
      }
    }
    // 現在のマップを表示させる
    screen.display_map();
  }

  // 現在のマップを表示させる
  display_map() {
    if (this.scroll_progress === null) {
      this.screen = this.stages[this.current_stage].slice(0);
    }
    // 左と上に移動する場合は、進むのではなくて戻るので処理が多少複雑になります
    if (this.direction === 'left') {
      const screencols = this.screen[0].length;
      let offset = screencols - this.cols - this.scroll_progress;
      offset = offset >= 0? offset : 0;
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < screencols; j++) {
          this.tile_draw_function(i, j - offset, this.tiles[this.screen[i][j]], this.tile_size)
        }
      }
    } else if (this.direction === 'up') {
      const screenrows = this.screen.length;
      let offset = screenrows - this.rows - this.scroll_progress;
      offset = offset >= 0? offset : 0;
      for (var i = 0; i < screenrows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.tile_draw_function(i - offset, j, this.tiles[this.screen[i][j]], this.tile_size)
        }
      }
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.tile_draw_function(i, j, this.tiles[this.screen[i][j]], this.tile_size)
        }
      }
    }
  }

  // 現在いるステージの`this.scroll_map`の中でのインデックスを返す
  // `this.scroll_map`は二次配列なので、[x, y]の形で返す
  get_stage_indices(stage = 0) {
    // `this.scroll_map`を1次元にして現在位置のインデックスを調べる
    const index = [].concat.apply([], ([].concat.apply([], this.scroll_map))).indexOf(stage);
    if (index === -1) {
      return false;
    }
    // 何コラムあるか
    const numColumns = this.scroll_map[0].length;
    // 1次元でのインデックスから何行目か計算
    const row = parseInt(index / numColumns);
    // 1次元でのインデックスから何列目か計算
    const col = index % numColumns;
    return [col, row]; 
  }

  // `this.scroll_map`にそって行先のステージを調べる
  // 行き止まりの場合は`false`を返す
  get_destination() {
    const current_stage_indices = this.get_stage_indices(this.current_stage);
    // console.log('現在位置', current_stage_indices);
    // ひとまず、わかりやすいアウトを蹴る
    if (this.direction == 'left' && current_stage_indices[0] < 1) {
      return false;
    }
    if (this.direction == 'up' && current_stage_indices[1] < 1) {
      return false;
    }

    // 目的地の`this.scroll_map`の中の[x, y]を決める
    let destination_stage_indices = current_stage_indices;
    if (this.direction == 'left') {
      destination_stage_indices[0] = destination_stage_indices[0] - 1;
    }
    else if (this.direction == 'right') {
      destination_stage_indices[0] = destination_stage_indices[0] + 1;
    }
    else if (this.direction == 'up') {
      destination_stage_indices[1] = destination_stage_indices[1] - 1;
    }
    else if (this.direction == 'down') {
      destination_stage_indices[1] = destination_stage_indices[1] + 1;
    }

    // console.log('目的地', destination_stage_indices);

    // 右や下からはみ出た場合も、蹴る
    if (
      destination_stage_indices[1] >= this.scroll_map.length
      || destination_stage_indices[0] >= this.scroll_map[0].length 
    ) {
      return false;
    }
    const destination = this.scroll_map[destination_stage_indices[1]][destination_stage_indices[0]];
    return destination;
  }

  // スクロールが時始まるように設定する
  // このスケッチではマウスのクリックで誘発するが、きっかけはなんでもいい
  initiate_scroll(direction = 'right') {
    if (screen.scroll_progress === null) {
      this.direction = direction;
      const destination = this.get_destination(this.direction);
      // console.log(direction, destination)
      if (destination === false) {
        return;
      }
      this.scroll_to = destination;
      this.scroll_progress = 1;
    }
  }

  // 2面の幅を持つマップを生成する
  generate_matrix_with_two_screens() {
    if (this.direction === 'right') {
      // 画面の各行
      for (var i = 0; i < this.rows; i++) {
        // 今までいた面のその行と同じになる
        this.screen[i] = this.stages[this.current_stage][i].slice(0);
        // そして、今からいく面のこの行の要素（数字）を一つずつ後ろに追加していく
        for (var j = 0; j < this.cols; j++) {
          this.screen[i].push(this.stages[this.scroll_to][i][j]);
        }
      }
    } else if (this.direction === 'left') {
      // 画面の各行
      for (var i = 0; i < this.rows; i++) {
        // 今までいた面のその行と同じになる
        this.screen[i] = this.stages[this.scroll_to][i].slice(0);
        // そして、今からいく面のこの行の要素（数字）を一つずつ後ろに追加していく
        for (var j = 0; j < this.cols; j++) {
          this.screen[i].push(this.stages[this.current_stage][i][j]);
        }
      }
    } else if (this.direction === 'down') {
      // 現在位置のステージの下に行先のステージをくっつけます
      this.screen = this.stages[this.current_stage].slice(0);
      for (var i = 0; i < this.rows; i++) {
        this.screen.push(this.stages[this.scroll_to][i].slice(0));
      }
    } else if (this.direction === 'up') {
      // 行先のステージの下に現在位置のステージをくっつけます
      this.screen = this.stages[this.scroll_to].slice(0);
      for (var i = 0; i < this.rows; i++) {
        this.screen.push(this.stages[this.current_stage][i].slice(0));
      }
    }
    // console.log(this.direction);
    // this.log_screen();
  }
  // 今の画面を文字で`console`に出力します
  log_screen() {
    this.screen.forEach((e) => {
      let row = '';
      e.forEach((c) => {
        row += c;
      });
      console.log(row);
    });
  }
  // 次の面まで1タイルずつスクロールさせます
  advance_scroll() {
    if (this.direction === 'right') {
      // 画面の各行
      for (var i = 0; i < this.rows; i++) {
        // その行の最初（一番左の）タイルを取り除く
        this.screen[i].shift();
      }
    } else if (this.direction === 'down') {
      // 上野行を抜きます。しかし、抜きすぎないように`if`
      if (this.screen.length > this.rows) {
        this.screen.shift();
      }
    } else if (this.direction === 'left') {
      // 画面の各行
      for (var i = 0; i < this.rows; i++) {
        // その行の最後（一番右の）タイルを取り除く
        // this.screen[i].pop();
      }
    } else if (this.direction === 'up') {
      if (this.screen.length > this.rows) {
        // this.screen.shift();
      }
    }
    // 1タイル分スクロールが進んだと記録する
    this.scroll_progress ++;
  }

  finalize_scroll() {
    // しばらくスクロールを止めるように
    this.scroll_progress = null;
    // 今までの行き先が次のスクロールの原点となる
    this.current_stage = this.scroll_to;
    // 現在のマップをそのまま行き先の面と同じにする
    this.screen = this.stages[this.current_stage].slice(0);

    // 次の行先は未定
    this.scroll_to = null;
    this.direction = null;
  }
}


// 定義したクラスからオブジェクトを名付けます
var screen;

function setup() {
  // スクロールを設定して初期化する
  // 設定はset_options.jsで指定しましょう
  set_options();

  createCanvas(16*screen.tile_size, 14*screen.tile_size).parent("p5js_div");

  noStroke();
}

function draw() {
  background('#c3f6f6');

  screen.draw();
}

// キーボードのカーソルキーでスクロールをはじめます
function keyPressed() {
  if (keyCode == UP_ARROW) {
    screen.initiate_scroll('up');
  }
  else if (keyCode == DOWN_ARROW) {
    screen.initiate_scroll('down');
  }
  else if (keyCode == LEFT_ARROW) {
    screen.initiate_scroll('left');
  }
  else if (keyCode == RIGHT_ARROW) {
    screen.initiate_scroll('right');
  }
}
// スクロールのきっかけはゲームのキャラクターの位置などにしてみましょう
