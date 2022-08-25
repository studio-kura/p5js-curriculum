// OpenSeaでのURLの最後の部分（最後のスラッシュから）
const playerTokenId = BigInt(
  "66944570731711987735845020825364593806926065595037873500763412727051124211713"
);
// とても大きい整数なので普通のNumberやintで扱えないのでBigIntクラスを使います
// 6.695E76 (6.695 * 10**76)
const enemyTokenId = BigInt(
  "59838097694147095793777431733585202279455896843409983234570034067316292976641"
);
// CharacterとEnemyのそれぞれのクラスで setup の中で作るオブジェクト
let character, enemy;

const canvasWidth = 400;
const canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character();
  // JSONを読み込むためのURIに入るToken IDは16進にしなければならない
  const playerTokenIdHex = "0x" + playerTokenId.toString(16);
  loadJSON(
    "https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/" +
      playerTokenIdHex +
      "?format=json",
    processPlayerJson // 読み込んだデータを処理する関数（下で定義）
  );

  enemy = new Enemy();
  const enemyTokenIdHex = "0x" + enemyTokenId.toString(16);
  loadJSON(
    "https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/" +
      enemyTokenIdHex +
      "?format=json",
    processEnemyJson // 読み込んだデータを処理する関数（下で定義）
  );
}

function draw() {
  background(255);
  enemy.display();
  character.display();
}

class Character {
  constructor() {
    this.imgurl = "";
    this.attack = 0;
    this.defense = 0;
    this.dexterity = 0;
    this.maxhp = 0;
    this.hp = 0;
    if (this.imgurl) this.img = loadImage(this.imgurl);
  }
  setImage(imgurl) {
    this.imgurl = imgurl;
    this.img = loadImage(this.imgurl);
  }
  display() {
    // コードが長くならないように別名定数を使います
    const w = canvasWidth;
    const h = canvasHeight;

    // 画像を画面の左下に表示
    push();
    translate(0, h * 0.55);
    if (this.img) image(this.img, 0, 0, h * 0.45, h * 0.45);
    pop();

    // 能力値を画面の右下に表示
    push();
    translate(h * 0.5, h * 0.5);
    // 体力ゲージ。赤は満タン（背景）で緑は現状
    noStroke();
    fill("red");
    rect(0, h * 0.25 - 15, w * 0.4, 15);
    fill("green");
    rect(0, h * 0.25 - 15, (w * 0.4 * this.hp) / this.maxhp, 15);
    fill(0);
    text("体力:", 0, h * 0.25 + 15);
    text("攻撃力:", 0, h * 0.25 + 30);
    text("防御力:", 0, h * 0.25 + 45);
    text(this.hp + "/" + this.maxhp, 0 + 45, h * 0.25 + 15);
    text(this.attack, 0 + 45, h * 0.25 + 30);
    text(this.defense, 0 + 45, h * 0.25 + 45);
    pop();
  }
}

class Enemy {
  constructor(imgurl, level) {
    this.imgurl = "";
    this.attack = 0;
    this.defense = 0;
    this.dexterity = 0;
    this.maxhp = 0;
    this.hp = 0;
    if (this.imgurl) this.img = loadImage(this.imgurl);
  }
  setImage(imgurl) {
    this.imgurl = imgurl;
    this.img = loadImage(this.imgurl);
  }
  display() {
    const w = canvasWidth;
    const h = canvasHeight;

    // 画像を画面の右上に表示
    push();
    translate(w * 0.55, 0);
    if (this.img) image(this.img, 0, 0, h * 0.45, h * 0.45);
    pop();

    // 能力値を画面の左上に表示
    push();
    translate(h * 0.1, 0);
    noStroke();
    fill("red");
    rect(0, h * 0.25 - 15, w * 0.4, 15);
    fill("green");
    rect(0, h * 0.25 - 15, (w * 0.4 * this.hp) / this.maxhp, 15);
    fill(0);
    text("体力:", 0, h * 0.25 + 15);
    text("攻撃力:", 0, h * 0.25 + 30);
    text("防御力:", 0, h * 0.25 + 45);
    text(this.hp + "/" + this.maxhp, 0 + 45, h * 0.25 + 15);
    text(this.attack, 0 + 45, h * 0.25 + 30);
    text(this.defense, 0 + 45, h * 0.25 + 45);
    pop();
  }
}

const processPlayerJson = (data) => {
  character.setImage(data.image);

  // data.traits配列の中の、
  // trait_typeプロパティが"attack"になっている要素だけをとります
  const attackTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "attack"
  );
  // もしそういう要素があったなら、最初のもののvalueプロパティを使います
  if (attackTraits.length > 0) character.attack = attackTraits[0].value;
  const defenseTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "defense"
  );
  if (defenseTraits.length > 0) character.defense = defenseTraits[0].value;
  const dexterityTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "dexterity"
  );
  if (dexterityTraits.length > 0)
    character.dexterity = dexterityTraits[0].value;
  const hpTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "hp"
  );
  if (hpTraits.length > 0) character.maxhp = hpTraits[0].value;
  character.hp = character.maxhp;
};

const processEnemyJson = (data) => {
  enemy.setImage(data.image);
  const attackTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "attack"
  );
  if (attackTraits.length > 0) enemy.attack = attackTraits[0].value;
  const defenseTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "defense"
  );
  if (defenseTraits.length > 0) enemy.defense = defenseTraits[0].value;
  const dexterityTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "dexterity"
  );
  if (dexterityTraits.length > 0) enemy.dexterity = dexterityTraits[0].value;
  const hpTraits = data.traits.filter(
    (trait) => trait.trait_type.toLowerCase() == "hp"
  );
  if (hpTraits.length > 0) enemy.maxhp = hpTraits[0].value;
  enemy.hp = enemy.maxhp;
};
