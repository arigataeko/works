int x;
boolean f = false;

void setup() {
  size(250, 125);
  noLoop();
}
void draw() {
  background(255);
  x = x + 1;
  ellipse(x, height/2, 10, 10);
  if (x >= width) { x = 0; }
}

void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

