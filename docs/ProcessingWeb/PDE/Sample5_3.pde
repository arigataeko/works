// キーで応答を変える
float easing = 0.05;
float x, y;
void setup() {
  size(250, 125);
  fill(0,0,0);
  noStroke();
}
void draw() {
  float targetX = mouseX;
  float targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
  ellipse(x, y, 10, 10);
}

void keyPressed(){
   if(key == 'r'){
    fill(255,0,0);
  }else if(key == 'y'){
    fill(255,255,0);
  }else if(key == 'b'){
    fill(0,0,0);
  }
}

