// 複数の円が左から右へ円上を移動する 円の大きさ異なる
// 円は大きくなったあと、小さくなる
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

float angle[]  = new float[10]; // 位置(角度)
float da = 2; // 角度の変化量
float x, y;
float len = 60; // 軌跡の円の半径
float d[] = new float[10]; // 円の直径
float dd=0.3;  //直径の増加量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  for(int i=0;i<angle.length;i++){
    angle[i] =  (-20) * i;
    d[i]= 1;
  }
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     for(int i=0; i<angle.length; i++){
          x =len * cos(radians(angle[i])) + width/2.0;
          y =len * sin(radians(angle[i])) + height/2.0;
          ellipse(x, y, d[i],d[i]);
          if (angle[i] >720) {
            angle[i]= 0;
            d[i] = 1;
          } else {
            angle[i] = angle[i] + da;
            if(angle[i] <360 && angle[i]>0) { d[i] = d[i]+dd; }
            else if(angle[i] >=360 && angle[i]<=720) { d[i] = d[i]-dd; }
          }
     }
}



