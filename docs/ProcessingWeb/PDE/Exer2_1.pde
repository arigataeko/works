int d = 10;
void setup() {
  size(250, 250);
  noFill();
  frameRate(10);
  noLoop(); // Web上で最初停止しておく
}
void draw() {
  background(255);
  int x = 30;   //変数xは、左上端の円のx座標の値
  int y = 30;   //変数yは、左上端の円のy座標の値
  d = d + 1;
  for (int j=0; j<10; j=j+1) {
    for (int i=0; i<10; i=i+1) {
      ellipse(x+i*20, y+j*20, d, d);
    }
    if (d >= width*2) { 
      d = 10;
    }
  }
}
// 以下はWeb上で開始停止をするため
boolean f = false;
void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

