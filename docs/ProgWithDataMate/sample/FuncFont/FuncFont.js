function setup() {
  createCanvas(250, 250);
  textSize(20);
  fill(200, 0, 0);
}
function draw() {
   background(0);
   ellipse(mouseX, mouseY, 15, 15);
   text("(" + mouseX + "," + mouseY + ")", mouseX+10, mouseY+5); 
}
