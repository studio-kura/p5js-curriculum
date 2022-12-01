function setup() {
  createCanvas(400, 400).parent("p5js_div");

  let x = 100;
  let y = 300;
  let s = 50;
  let t = "hello";
  let c = color(255, 0, 0); // 赤

  fill(c);
  ellipse(x, y, s, s);
  text(t, x, 100);

}
