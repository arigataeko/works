const x = 35;
const y = 35;
let d = 0;
function setup() {
  createCanvas(250, 250);
  noStroke();
  fill(0);
  frameRate(10);
}
function draw() {
  background(220);
  if (d>=20) {
    d = 0;
  }
  d = d + 1;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      ellipse(x+i*20, y+j*20, d);
    }
  }
}
