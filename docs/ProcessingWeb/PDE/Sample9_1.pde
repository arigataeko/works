// とげとげが左から右へ移動する
int x; // 位置(x座標)
PImage dot;
boolean f = false;

void setup() {
  size(250, 125);  //描画するための画面
  dot = loadImage("images/star20.png");
  x = -dot.width;  //最初の位置、画像の幅分だけ隠れたところ
  noLoop();
}

void draw() { 
   background(255);   //モニタ画面の背景を白でクリア
   x = x + 1; // 位置を変化。
   image(dot, x, height/2-dot.height/2); //画像を描画 
   if (x >= width) { x = -dot.width; }
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

