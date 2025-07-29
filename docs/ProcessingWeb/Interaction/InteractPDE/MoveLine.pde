// マウスy位置に応じて色面の位置を変える
int wide=150;  // 画面の大きさ

void setup() {
  size(wide, wide); 
  noStroke();
}

void draw() { 
  fill(255, 220, 0);  //黄色
  rect(0, 0, wide, mouseY);
  fill(0, 0, 160);  //青
  rect(0, mouseY, wide, wide-mouseY);
}


