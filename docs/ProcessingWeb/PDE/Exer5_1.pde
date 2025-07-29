//ドラッグで図形を描く
// r: 四角、e: 円、s:線
int x, y;
final int RECT = 1;  
final int ELLIPSE = 2; 
final int LINE=3;
int type = RECT; // 1: rect, 2: circle, 3: line

void setup() {
  size(250, 250);
  background(255);
  fill(255,0,0);
}
void draw() {     }

void mousePressed(){
    x = mouseX;
    y = mouseY;
}
void mouseDragged(){
    background(255);
    if (type == RECT) {
      rectMode(CORNERS);
      rect(x, y, mouseX, mouseY);
    } else if (type == ELLIPSE) {
      ellipseMode(CORNERS);
      ellipse(x, y, mouseX, mouseY);
    }else if (type==LINE) {
      line(x, y, mouseX, mouseY);
    }
}
void keyPressed() {
  if (key == 'r') {  //キー入力がrなら
    type = RECT;
  } else if (key == 'e') {  //キー入力がeなら
    type = ELLIPSE;
  } else if (key == 'l') {  //キー入力がlなら
    type = LINE;
  } 
}

