// 円が円上を移動 円の大きさ変化 徐々に増加後、徐々に減少
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
float da = 2; // 角度の変化量
float x, y;
float d = 1; // 円の直径
float dd = 0.3; // 半径の変化量
float len = 60; // 軌跡の円の半径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() {      
     background(255);   //モニタ画面の背景を白でクリア
     x = len * cos(radians(angle)) + width/2.0;
     y = len * sin(radians(angle)) +  height/2.0;
     ellipse(x, y, d, d);
     
     if (angle > 720) { //1サイクル終わったら
        angle = 0;  //初期値に戻す
        d = 1;
     } else {
        angle = angle + da;
        if(angle <360 && angle>0) { d = d+dd; }  // 0-360の間は増加
        else if(angle >=360 && angle<=720) {  d = d-dd; }  // 360-720の間は減少
     }
}



