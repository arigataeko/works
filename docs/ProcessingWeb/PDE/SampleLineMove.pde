int x;   // 垂直線の位置(x座標)を保存する変数の準備
boolean f = false;
void setup(){
   size(150,150);
   frameRate(10);    // 1秒に10回draw()の中を実行する(つまり描画する)
}

void draw(){
  background(255);    // 画面の背景を白でクリア
  x = (x + 5)%150;
  line(x, 0, x, 150); // x座標に垂直線を描く
}

void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}


