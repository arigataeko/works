// 複数の円が左から右へ波にのって移動する 円の大きさ異なる
// 円は出てくると徐々に大きくなる
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
float da = 8; // 角度の変化量
float x, y;
float h =60; // 振幅
float d[]  = new float[10]; // 円の直径
float dd=0.8;  //直径の増加量
boolean on[] = new boolean[10];   //登場しているかどうか

void setup() {
  size(150, 150);   //描画するための画面
  frameRate(30);    //フレームレート
  fill(0);
  angle[0] = -30;
  for(int i=1;i<angle.length;i++){
    angle[i] = angle[i-1] -30;
    d[i]= 1  ;
  }
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     for(int i=0; i<angle.length; i++){
          x = angle[i]*width/360.0;
          y = height/2.0 - sin(radians(angle[i]))*h;
          ellipse(x, y, d[i], d[i]);

          angle[i] = angle[i] + da;
          if (angle[i]>360+50) {  //1サイクル終わったら、はじめから
            on[i] = false; //右へ消えた
            angle[i]=-30; //角度初期化
            d[i]= 1;   //サイズ初期化
          } else if(angle[i]>=0) {  //画面上に登場した
             on[i]=true;
          }
          if(on[i]) d[i] = d[i]+dd;  //登場している時だけサイズ増加
     }
}


