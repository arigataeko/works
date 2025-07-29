// ２つの円が円上を移動 衝突する。往復運動
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

float angle1, angle2; // 位置(角度)
float x1, y1, x2, y2;
float d = 10; // 円の直径
float da1 = 3; // 角度の変化量
float da2 = -da1; // 角度の変化量
float len = 60; // 軌跡の円の半径
float ver=270;   //往復位置の補正　角度

void setup() {
  size(150, 150);   //描画するための画面
  noStroke();
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     angle1 = angle1 + da1;
     angle2 = angle2 + da2;
     x1 = len * cos(radians(angle1+ver)) + width/2.0;
     y1 = len * sin(radians(angle1+ver)) + height/2.0;
     fill(200,0,0);
     ellipse(x1, y1, d, d);
     x2 = len * cos(radians(angle2+ver)) + width/2.0;
     y2 = len * sin(radians(angle2+ver)) + height/2.0;
     fill(0);
     ellipse(x2, y2, d, d);
     if(abs(angle1-angle2)>=360 || abs(angle1-angle2)<=0){ //衝突した
         da1 = -da1;
         da2 = -da2;
     }
}


