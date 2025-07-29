// 円が左から右へ波にのって移動 往復運動
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

float angle; // 位置(角度)
float x, y;
float d = 10; // 円の直径
float h =60; // 振幅
float da = 5; // 角度の変化量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     angle = angle + da;
     x = map(angle, 0, 360, 0, width);
     y = height/2.0 - sin(radians(angle))*h;
     ellipse(x, y, d, d);
     if(angle<0 || angle>360){//右の壁または左の壁
         da = -da;
     }
}


