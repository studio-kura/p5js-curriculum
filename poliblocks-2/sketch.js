let offsetX, offsetY, sqSide;
let circleColorR, circleColorG, circleColorB;

function setup() {
  createCanvas(windowWidth, windowHeight).parent("p5js_div");
  circleColorR = ~~(random()*256);
  circleColorG = ~~(random()*256);
  circleColorB = ~~(random()*256);
  console.log(windowWidth, windowHeight);
  windowResized();
}

function draw() {
  background(255);
  push();
  translate(offsetX, offsetY);
  fill(222);
  rect(0, 0, sqSide, sqSide);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(sqSide/2, sqSide/2, sqSide/2, sqSide/2);
  pop();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
}
