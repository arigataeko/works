// 円が左から右へ波にのって移動 軌跡を残す
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

float angle; // 位置(角度)
float da = 5; // 角度の変化量
float x, y;
float d = 10; // 円の直径
float h =50; // 振幅

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  background(255);   //モニタ画面の背景を白でクリア
}

void draw() {
     x = angle*width/360;
     y = height/2.0 - sin(radians(angle))*h;
     ellipse(x, y, d, d);
     angle = angle + da;   // daずつ増加
     if (angle>=360) {
        angle=0;           // 360を超えたので、0に戻す
        background(255);   //画面の背景を白でクリア
     } 
}



