function setup() {
  createCanvas(400, 400).parent("p5js_div");
  c = color(255);
}

function draw() {
  background(220);
  button(50, 100, 50, 255);
  button(100, 100, 50, color(255, 0, 0));
  button(150, 100, 50, color(0, 255, 0));
}

function button(x, y, s, c) {
  let bc;
  if (
    mouseX > x &&
    mouseX < x + s &&
    mouseY > y &&
    mouseY < y + s &&
    mouseIsPressed
  ) {
    bc = color(0);
  } else {
    bc = c;
  }
  fill(bc);
  rect(x, y, s, s);
}
