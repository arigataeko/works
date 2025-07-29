void setup() {
  size(250, 125);
}
void draw() {
  float r = dist(mouseX, mouseY, pmouseX, pmouseY);
  ellipse(mouseX, mouseY, r, r);
}


