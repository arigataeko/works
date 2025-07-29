//放射線
//中央点がイージングされてマウスに追いつく
int len = 100;
float x, y;
float cx, cy; //放射線の集まった点の座標
float easing = 0.08;
void setup() {
  size(250, 250);
}
void draw() {
  background(255);
  float targetX = mouseX;
  float targetY = mouseY;
  cx = cx + (targetX - cx) * easing;
  cy = cy + (targetY - cy) * easing;
  for (int i=0; i<360; i=i+20) {
    x = width/2 + len*cos(radians(i));
    y = height/2 - len*sin(radians(i));
    line(cx, cy, x, y);
  }
}


