const x = 35;
const y = 35;
const max = 30;
let d = 0;
let henka = 1;

let move = true;

function setup() {
  createCanvas(250, 250);
  noStroke();
  fill(0);
  frameRate(10);
}
function draw() {
  background(220);
  if (d>=max || d<0) {
    henka = -henka;
  }
  d = d + henka;
  ellipse(x, y, d);
}
function mousePressed() {
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}
