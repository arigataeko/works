int d = 10;

void setup() {
  size(200, 200);
 noLoop();
}
void draw() {
  background(255);
  d = d + 1;
  ellipse(width/2, height/2, d, d);
  if (d >= width) { d = 10; }
}

void mousePressed(){
    loop();
}

void mouseReleased(){
    noLoop();
}

