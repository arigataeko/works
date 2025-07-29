// 円が円上を移動 往復運動 円の大きさ変化
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
float d = 2; // 円の直径
float da = 3; // 角度の変化量
float len = 60; // 軌跡の円の半径
float ver=270;  //往復位置の補正　角度 3時位置は0度、右回り
void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     angle = angle + da;
     if (angle>=360 || angle<0) { //1周したら動きの方向変える
        da = -da; 
     } else {  //円周上の途中ではサイズ変える
       if(da>0) { d = d+0.5; }  //右回りは増加
       else if(da<0) { d = d-0.5; } //左回りは減少
     }
     x = len * cos(radians(angle+ver)) + width/2.0;
     y = len * sin(radians(angle+ver)) + height/2.0;
     ellipse(x, y, d, d);
}


