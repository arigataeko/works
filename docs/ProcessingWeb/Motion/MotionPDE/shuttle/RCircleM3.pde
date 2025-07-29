//  大きさが異なる複数の円が円上を移動 往復運動 
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

float[] angle  = new float[10]; // 位置(角度)
float[] da =  new float[10]; //  角度の変化量
float[] d =  new float[10]; // 円の直径
float x, y;
float len = 60; // 軌跡の円の半径
float ver=270;  //往復位置の補正　角度 3時位置は0度、右回り

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  da[angle.length-1]=3; d[d.length-1] = 2;
  for(int i=angle.length-2;i>=0;i--){  
    angle[i]= angle[i+1] + 15;
    d[i] = d[i+1] +2;
    da[i] = 3;
  }
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     for(int i=0; i<angle.length; i++){
       angle[i] = angle[i] + da[i];
       x = len * cos(radians(angle[i]+ver)) + width/2.0;
       y = len * sin(radians(angle[i]+ver)) + height/2.0;
       ellipse(x, y, d[i], d[i]);
       
       if (angle[i]>=360) {
           angle[i] = 360 - (angle[i]-360);  //360を越えたとき360を越えた差分を折り返す
           da[i] = -da[i];
       } else if (angle[i]<0) {
           angle[i] = - angle[i];  //0を越えたとき0を越えた差分を折り返す
           da[i] = -da[i];
       }
     }
}


