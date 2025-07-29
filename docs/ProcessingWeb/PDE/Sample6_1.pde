float x= 5;
float s = 1;
boolean f = false;

void setup() {
  size(250, 125);
  noLoop();
}
void draw() {
  background(255);
  x = x + s;
  ellipse(x, height/2, 10, 10);
  if (x >= width || x < 0) { s = -s; }
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

