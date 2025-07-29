// 円が円上を移動
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
float da = 3; // 角度の変化量
float len = 60; // 軌跡の円の半径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     if (angle>=360) {
        angle=5;
     } else {
        angle = angle + da;
     }
     x =(int)(len * cos(radians(angle)) + width/2.0);
     y =(int)(len * sin(radians(angle)) +  height/2.0);
     ellipse(x, y, d, d);
}


