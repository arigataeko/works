// 円が左から右へ移動する 加速運動

//マウスで停止、再開
boolean f = true;
void mouseClicked() {
  if (f) {
    noLoop();
    f = false;
  }
  else {
    loop();
    f = true;
  }
}

float init=0; //移動速度の初期値
float s = init; // 移動速度
float a = 0.1; // 加速
float x; // 位置(x座標)
float d = 10; // 円の直径

void setup() {
  size(150, 150);
  fill(0);
}

void draw() { 
  background(255);   //画面背景を白でクリア
  s = s + a;  // 速度を変化
  x = x + s;  // 位置を変化。
  if (x>=width+d/2) {
    x=-d/2;
    s=init; //速度を初期値に戻す
  }
  ellipse(x, height/2, d, d);
}


