// 円が左から右へ移動, 円の大きさ変化

//マウスで停止、再開
boolean f = true;
void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

float s = 3; // 移動速度
float x; // 位置(x座標)
float d = 2; // 円の直径

void setup() {
  size(150, 150);
  fill(0);
}

void draw() { 
   background(255);   //画面背景を白でクリア
    x = x+s ;  // 位置を変化
    d = d+1;   // 大きさを変化
    if(x>=width+d/2) { //右端を越えたら、元に戻す
       d=2;
       x=-d/2;
    }
     ellipse(x, height/2, d, d);
}

