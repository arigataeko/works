//  複数の円が円上を移動 往復運動
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
float x, y;
float d = 10; // 円の直径
float len = 60; // 軌跡の円の半径
float ver=270;  //往復位置の補正　角度 3時位置は0度、右回り

void setup() {
  size(150, 150);   //描画するための画面
  noStroke();
  colorMode(HSB, 100); //色相、明度、彩度を0-100で指定
  da[angle.length-1]=3;  // 配列daの末尾は3
  for(int i=angle.length-2;i>=0;i--){ // 配列のうしろから値を初期化
    angle[i]= angle[i+1] + 10;// 配列末尾は0で、先頭に向かって10ずつ増える
    da[i] = da[i+1];          //後ろの要素と同じ値(全部3)
  }
}

void draw() { 
     background(100);   //画面の背景を白でクリア
     for(int i=0; i<angle.length; i++){
       angle[i] = angle[i] + da[i];
       if (angle[i]>=360) {
           angle[i] = 360 - (angle[i]-360);  //360を越えたときの間隔を補正
           da[i] = -da[i];
       } else if (angle[i]<0) {
           angle[i] =- angle[i];   //0を越えたときの間隔を補正
           da[i] = -da[i];
       }
       x = len * cos(radians(angle[i]+ver)) + width/2.0;
       y = len * sin(radians(angle[i]+ver)) + height/2.0;
       fill(2*i, 100, 100); //色相だけ0-18で変化させる(赤ー黄)
       ellipse(x, y, d, d);
     }
}


