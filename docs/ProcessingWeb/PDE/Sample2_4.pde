// マウスのクリックで応答を変える
float easing = 0.05;

float x, y;
void setup() {
  size(250, 125);
  noStroke();
}
void draw() {
  float targetX = mouseX;
  float targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
  if(mousePressed){
    fill(255,0,0);
  }else{
    fill(0,0,0);
  }
  ellipse(x, y, 10, 10);
}


