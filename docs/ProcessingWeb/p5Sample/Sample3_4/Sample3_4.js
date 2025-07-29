var easing = 0.05;
var x = 0.0;
var y = 0.0;
function setup() {
  createCanvas(250, 125);
  background(200);
  noStroke();
}


function draw() {
  var targetX = mouseX;
  var targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
    if(mouseIsPressed){  
    fill(255,0,0);
  }else{
    fill(0,0,0);
  }
  ellipse(x, y, 10, 10);
}
