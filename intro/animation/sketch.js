let x = 100;
let y = 200;
let s = 30;

let speedX = 1.5;
let speedY = 2;

function setup() {
  createCanvas(400, 400).parent("p5js_div");
  noStroke();
}
function draw() {
  background(0, 30);

  x = x + speedX;
  if (x > width || x < 0) {
    speedX = speedX * -1;
  }
  y = y + speedY;
  if (y > width || y < 0) {
    speedY = speedY * -1;
  }
  ellipse(x, y, s, s);
}
