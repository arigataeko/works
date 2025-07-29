let x = 35;
function setup() {
  createCanvas(250, 250);
  noStroke();
  fill(0);
}
function draw() {
  background(220);
  for (let i=0; i<10; i++) {
    circle(x+i*20, 35, 20);
  }
}
