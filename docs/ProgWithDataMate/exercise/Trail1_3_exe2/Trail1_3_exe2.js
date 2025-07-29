const x = 35;
const y = 35;
let d = 20;
let alpha = 255;
let henka = 2;

let move = true;

function setup() {
  createCanvas(250, 250);
  noStroke();
  frameRate(10);
}
function draw() {
  background(220);
  if (alpha >= 255 || alpha < 0) {
    henka = -henka;
  }
  alpha = alpha + henka;
  fill(0, alpha);
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      ellipse(x+i*20, y+j*20, d);
    }
  }
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
