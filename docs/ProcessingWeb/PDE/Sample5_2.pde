int x, y;
void setup() {
  size(250, 250);
  background(255);
  fill(255,0,0);
  rectMode(CORNERS);
}
void draw() {     }
void mousePressed(){
    x = mouseX;
    y = mouseY;
}
void mouseDragged(){
    background(255);
    rect(x, y, mouseX, mouseY);
}

