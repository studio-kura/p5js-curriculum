const character_imgurl = 'https://lh3.googleusercontent.com/D1SczNIqYB2v453FMKb_DIi9YAzp5uSri4TqsuV3R8qqGnfUMfwItUl77TMMH8P6J6-e3VCMCcEyat2bIdZ9KgJW8CVLkyANebAs9A=s0'
const character_seed = 62918246465537
const enemy_imgurl = 'https://lh3.googleusercontent.com/XUlJ3s4X3x1fsjE6bOl7GtTRmDIlAl1RPpvZWZ87yE4Yn832ESXKt_Btm9wets_A7jaI57yGr4TtxCRBgC3ChKr3bpXjfzh2TA7UMw=s0'
let character, enemy

const stats_total = 255
const power_min = 40
const power_max = 70
const toughness_min = 40
const toughness_max = 70
const level_min = 10
const level_max = 50

const canvasWidth = 400
const canvasHeight = 400

function setup() {
  createCanvas(canvasWidth, canvasHeight)
  character = new Character(character_imgurl, character_seed)
  enemy = new Enemy(enemy_imgurl, 20)

  // 減っている体力の見た目が確認できるように
  // （ゲームの動きではありません）
  enemy.hp = ~~(enemy.maxhp * 60 / 100)
}

function draw() {
  background(255)
  character.display()
  enemy.display()
}

class Character {
  constructor(imgurl, seed){
    this.imgurl = imgurl
    this.seed = seed
    const power_seed = this.seed % 10000
    this.power = ~~map(power_seed, 0, 9999, power_min, power_max)
    const toughness_seed = ~~((this.seed % 100000000)/10000)
    this.toughness = ~~map(toughness_seed, 0, 9999, toughness_min, toughness_max)
    this.maxhp = stats_total - this.power - this.toughness
    this.hp = this.maxhp
    this.img = loadImage(this.imgurl)
  }
  
  display() {
    const w = canvasWidth
    const h = canvasHeight

    push()
    translate(0, h * 0.55)
    image(this.img, 0, 0, h * 0.45, h * 0.45)
    pop()

    push()
    translate(h * 0.5, h * 0.5)
    noStroke()
    fill('red')
    rect(0, h * 0.25 - 15, w * 0.4, 15)
    fill('green')
    rect(0, h * 0.25 - 15, w * 0.4 * this.hp / this.maxhp, 15)
    fill(0)
    text('体力:', 0, h * 0.25 + 15)
    text('攻撃力:', 0, h * 0.25 + 30)
    text('防御力:', 0, h * 0.25 + 45)
    text(this.hp + '/' + this.maxhp, 0 + 45, h * 0.25 + 15)
    text(this.power, 0 + 45, h * 0.25 + 30)
    text(this.toughness, 0 + 45, h * 0.25 + 45)
    pop()
  }
}

class Enemy {
  constructor(imgurl, level){
    this.imgurl = imgurl
    this.level = level
    this.power = ~~map(level, level_min, level_max, power_min, power_max)
    this.toughness = ~~map(level, level_min, level_max, toughness_min, toughness_max)
    const enemy_stats_total = ~~map(level, level_min, level_max, stats_total * 0.65, stats_total)
    this.maxhp = enemy_stats_total - this.power - this.toughness
    this.hp = this.maxhp
    this.img = loadImage(this.imgurl)
  }
  
  display() {
    const w = canvasWidth
    const h = canvasHeight

    push()
    translate(w * 0.55, 0)
    image(this.img, 0, 0, h * 0.45, h * 0.45)
    pop()

    push()
    translate(h * 0.1, 0)
    noStroke()
    fill('red')
    rect(0, h * 0.25 - 15, w * 0.4, 15)
    fill('green')
    rect(0, h * 0.25 - 15, w * 0.4 * this.hp / this.maxhp, 15)
    fill(0)
    text('体力:', 0, h * 0.25 + 15)
    text('攻撃力:', 0, h * 0.25 + 30)
    text('防御力:', 0, h * 0.25 + 45)
    text(this.hp + '/' + this.maxhp, 0 + 45, h * 0.25 + 15)
    text(this.power, 0 + 45, h * 0.25 + 30)
    text(this.toughness, 0 + 45, h * 0.25 + 45)
    pop()
  }
}
