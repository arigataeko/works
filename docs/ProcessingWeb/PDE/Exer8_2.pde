// 円の入れ子。 マウスクリックで新しい図形を描く

void setup() {
  size(250, 250);
  background(255);
  noFill();
  circlesR(125, 125, 100, 5);
}
void draw(){}

void circlesR(float x, float y, float r, int n) {
  ellipse(x, y, r*2, r*2);
  if (n>1) {
    float newR = r/2;
    float angle = random(PI);
    circlesR(x+newR*cos(angle), y+newR*sin(angle), newR, n-1);
    circlesR(x-newR*cos(angle), y-newR*sin(angle), newR, n-1);
  }
}

void mouseReleased(){
    background(255);
    circlesR(125, 125, 100, 5);
}


