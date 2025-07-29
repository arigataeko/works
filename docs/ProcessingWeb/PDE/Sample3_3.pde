// マウスの位置に遅れて追いつく
float easing = 0.05;

float x, y;
void setup() {
  size(250, 125);
}
void draw() {
  float targetX = mouseX;
  float targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
  ellipse(x, y, 10, 10);
}


