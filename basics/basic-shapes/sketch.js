function setup() {
  createCanvas(400, 400).parent("p5js_div");
  background(255);
  ellipse(200, 200, 100, 100); //頭
  rect(150, 250, 100, 150); //体
  line(150, 250, 50, 300); //左腕
  line(250, 250, 350, 300); //右腕
  ellipse(180, 180, 20, 20); //左目
  ellipse(220, 180, 20, 20); //右目
}
