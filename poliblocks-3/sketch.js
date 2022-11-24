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

const circleSeed = pb.random();
const backgroundSeed = pb.random();
const diameterSeed = pb.random();

function getRandomColor(seed) {
  if (seed < 0.01) { return 'black' }
  else if (seed < 0.02) { return 'dark-blue' }
  else if (seed < 0.05) { return 'dark-purple' }
  else if (seed < 0.08) { return 'dark-green' }
  else if (seed < 0.11) { return 'brown' }
  else if (seed < 0.14) { return 'dark-grey' }
  else if (seed < 0.17) { return 'light-grey' }
  else if (seed < 0.20) { return 'white' }
  else if (seed < 0.30) { return 'red' }
  else if (seed < 0.40) { return 'orange' }
  else if (seed < 0.50) { return 'yellow' }
  else if (seed < 0.60) { return 'green' }
  else if (seed < 0.70) { return 'blue' }
  else if (seed < 0.80) { return 'lavender' }
  else if (seed < 0.90) { return 'pink' }
  else { return 'light-peach' }
}

function getRandomDiameter(seed) {
  if (seed < 0.1) { return 400 } // 10%で全面サイズの丸
  else if (seed < 0.3) { return 100 } // 20%で一番小さい丸
  else if (seed < 0.5) { return 300 } // 20%で大きな丸
  else { return 200 } // 50%で今までのcanvasの半分のサイズ
}

pb.attributes = {
  'Circle color': getRandomColor(circleSeed), // string
  'Background color': getRandomColor(backgroundSeed), // string
  'Diameter': getRandomDiameter(diameterSeed), // number
}
console.log(pb.attributes);

const palette = {
  "black": [0, 0, 0],
  "dark-blue": [29, 43, 83],
  "dark-purple": [126, 37, 83],
  "dark-green": [0, 135, 81],
  "brown": [171, 82, 54],
  "dark-grey": [95, 87, 79],
  "light-grey": [194, 195, 199],
  "white": [255, 241, 232],
  "red": [255, 0, 77],
  "orange": [255, 163, 0],
  "yellow": [255, 236, 39],
  "green": [0, 228, 54],
  "blue": [41, 173, 255],
  "lavender": [131, 118, 156],
  "pink": [255, 119, 168],
  "light-peach": [255, 204, 170]
};

let circleColorR, circleColorG, circleColorB;
function setup() {
  createCanvas(400, 400).parent("p5js_div");
  const colorRGB = palette[pb.attributes['Circle color']];
  circleColorR = colorRGB[0];
  circleColorG = colorRGB[1];
  circleColorB = colorRGB[2];
}

function draw() {
  const colorRGB = palette[pb.attributes['Background color']];
  background(colorRGB[0], colorRGB[1], colorRGB[2]);
  fill(circleColorR, circleColorG, circleColorB);
  ellipse(200, 200, pb.attributes['Diameter'], pb.attributes['Diameter']);
}