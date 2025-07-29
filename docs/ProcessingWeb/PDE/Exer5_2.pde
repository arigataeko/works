//ドラッグで図形を描く
// r: 四角、e: 円、s:線
// 色を右上円のクリックで指定

PGraphics pg;
int x, y;
final int RECT = 1;  
final int ELLIPSE = 2; 
final int LINE=3;
int type = RECT; // 1: rect, 2: circle, 3: line

void setup() {
  size(250, 250);
  background(255);
  noFill();
  pg = createGraphics(width, height);
}
void draw() {   }

void mousePressed(){
    x = mouseX;
    y = mouseY;     
}

void mouseDragged(){
    background(255);
    pg.beginDraw();
    pg.endDraw();
    image(pg, 0, 0);
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

void mouseReleased(){
    pg.beginDraw();
    pg.noFill();
    if (type == RECT) {
      pg.rectMode(CORNERS);
      pg.rect(x, y, mouseX, mouseY);
    } else if (type == ELLIPSE) {
      pg.ellipseMode(CORNERS);
      pg.ellipse(x, y, mouseX, mouseY);
    }else if (type==LINE) {
      pg.line(x, y, mouseX, mouseY);
    }
     pg.endDraw();
     image(pg, 0, 0);
}

void keyPressed() {
  if (key == 'r') {  //キー入力がrなら
    type = RECT;
  } else if (key == 'e') {  //キー入力がeなら
    type = ELLIPSE;
  } else if (key == 'l') {  //キー入力がlなら
    type = LINE;
  } else if (key == 'c') {
     pg.beginDraw();
     pg.background(255);
     pg.endDraw();
     image(pg, 0, 0);
  }
}

