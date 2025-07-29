// マウスの位置に遅れて追いつく
// マウスボタンが押されているときはついていかない
float easing = 0.05;

float x, y;
void setup() {
  size(250, 250);
  fill(0);
}
void draw() {
  background(255);
  if (!mousePressed) {
    float targetX = mouseX;
    float targetY = mouseY;
    x = x + (targetX - x) * easing;
    y = y + (targetY - y) * easing;
  }
  ellipse(x, y, 10, 10);
}


