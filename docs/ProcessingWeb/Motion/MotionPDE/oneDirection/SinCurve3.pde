// 円が左から右へ波にのって移動 円の大きさ変化
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
float d = 2; // 円の直径
float h =50; // 振幅

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //画面背景を白でクリア
     x = angle*width/360.0;
     y = height/2.0 - sin(radians(angle))*h;
     ellipse(x, y, d, d);
     
     angle = angle + da;
     if (angle>=360) {
        angle=0;
        d = 2;
     } else {
        d = d+0.5;
     }

}



