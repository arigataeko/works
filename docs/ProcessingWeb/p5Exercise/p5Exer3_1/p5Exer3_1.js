var x = 0.0;
var y = 0.0;
var len = 100.0;
function setup() {
  createCanvas(250, 250);    
}
function draw() {
  background(200);
  for (var i=0; i<360; i=i+20) {
    x = width/2 + len*cos(radians(i));
    y = height/2 - len*sin(radians(i));
    line(mouseX, mouseY, x, y);
  }
}
