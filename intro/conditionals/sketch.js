let result = 95;
function setup() {
  createCanvas(400, 400).parent("p5js_div");
  textSize(24);
}

function draw() {
  background(220);
  if (result < 50) {
    text("頑張ってー", 100, 200);
  } else if (result > 90 && result <= 99) {
    text("すごい!素晴らしい!", 100, 200);
  } else if (result == 100) {
    text("すごすぎ天才!!!", 100, 200);
  } else {
    text("普通だね", 100, 200);
  }
}
