function setup() {
  createCanvas(250, 125);
  background(200);
}


function draw() {
  var r = dist(mouseX, mouseY, pmouseX, pmouseY);
  ellipse(mouseX, mouseY, r, r);
}
