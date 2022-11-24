window.pb = {
  hash: Array(32).fill(0).map(_=>"123456789abcdefghijkmnopqrstuvwxyz"[(Math.random()*32)|0]).join("") 
};

function sfc32(hash) {
  var a = parseInt(hash.substr(0, 8), 36);
  var b = parseInt(hash.substr(8, 8), 36);
  var c = parseInt(hash.substr(16, 8), 36);
  var d = parseInt(hash.substr(24, 8), 36);
  return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
  };
}
window.pb.random = new sfc32(pb.hash);
window.pb.randrange = function(min, max) {
  return window.pb.random() * (max - min) + min;
}
window.pb.randint = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(window.pb.random() * (max - min + 1) + min);
}

let circleColorR, circleColorG, circleColorB;
function setup() {
  createCanvas(400, 400).parent("p5js_div");
  circleColorR = pb.randint(0, 255);
  circleColorG = pb.randint(0, 255);
  circleColorB = pb.randint(0, 255);
  console.log(circleColorR, circleColorG, circleColorB);
}

function draw() {
  background(220);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(200, 200, 200, 200);
}
