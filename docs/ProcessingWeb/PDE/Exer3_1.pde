//放射線
int len = 100;
float x, y;
void setup() {
  size(250, 250);
}
void draw() {
  background(255);
  for (int i=0; i<360; i=i+20) {
    x = width/2 + len*cos(radians(i));
    y = height/2 - len*sin(radians(i));
    line(mouseX, mouseY, x, y);
  }
}


