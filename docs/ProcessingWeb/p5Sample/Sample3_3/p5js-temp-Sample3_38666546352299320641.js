var easing = 0.05;
var x = 0.0;
var y = 0.0;
function setup() {
  createCanvas(250, 125);
  background(200);
}


function draw() {
  var targetX = mouseX;
  var targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
  ellipse(x, y, 10, 10);
}
