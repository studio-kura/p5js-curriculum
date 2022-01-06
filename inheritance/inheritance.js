var pochi, arinko, takosuke;
function setup() {
    createCanvas(400, 400);
    pochi = new Inu(100, 100);
    arinko = new Ari(100, 200);
    takosuke = new Tako(100, 300);
}

function draw() {
    background(127);
    pochi.display();    
    arinko.display();    
    takosuke.display();    
}
class Ikimono {
  constructor(ashi, x, y) {
    this.ashi = ashi;
    this.x = x;
    this.y = y;
    this.namae = 'ikimono';
  }
  display() {
    text(this.ashi, this.x, this.y);
  }
}

class Inu extends Ikimono {
  constructor(x, y) {
    super(4, x, y);
    this.namae = 'inu';
  }
  display() {
    text(this.namae + ": " + this.ashi, this.x, this.y);
  }
}

class Ari extends Ikimono {
  constructor(x, y) {
    super(6, x, y);
    this.namae = 'ari';
  }
  display() {
    text(this.namae + ": " + this.ashi, this.x, this.y);
  }
}

class Tako extends Ikimono {
  constructor(x, y) {
    super(8, x, y);
    this.namae = 'tako';
  }
  display() {
    text(this.namae + ": " + this.ashi, this.x, this.y);
  }
}
