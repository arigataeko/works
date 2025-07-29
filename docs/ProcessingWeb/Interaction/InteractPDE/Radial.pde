// 複数の円が中央から放射状に移動する 加速運動
// 閾値以上なら、スタート

int wide=150;        // 画面の大きさ
float len;  // 円が描かれる円周の半径
float x;   // 円のx座標
float y;   // 円のy座標
float centerX; // 画面の中央
float centerY;  // 画面の中央
float level; // 閾値
boolean move = false;
int degree= 10; //放射線の間隔角度
float init=0; //移動速度の初期値
float s = init; // 移動速度
float a = 0.3; // 加速
float d = 10; // 円の直径
PFont f;
void setup() {
   size(wide,wide);   
   frameRate(30);    //1秒に30回再描画
   centerX=width/2.0;  // 画面の中央
   centerY=height/2.0;  // 画面の中央
   x=centerX;  // 中心点、はじめは画面の中央
   y=centerY;
   level=centerX; // 閾値
   noStroke(); // 線は引かない
   f = createFont("Arial", 14);
   textFont(f);
   textAlign(CENTER, CENTER);
}

void draw() { 
   background(255);   //モニタ画面の背景を白でクリア
   if(move){ //移動中
      if(len>=wide/2) {  //十分広がったら、はじめに戻す
           move= false;
           x=centerX; y=centerY;
           s=init; //移動速度の初期値
           len=0;
      }
      s = s + a;
      len = len+s; 
   } else {  //移動していないとき
    if( mouseX >= level){  //マウスの位置が閾値を越え、スイッチが入った
       move = true;
    }
  }
  fill(200, 0, 0);
  //円周上degree(10)度の間隔で、円を描く
  for(float angle=0; angle<360; angle=angle+degree){
      x = centerX + len*cos(radians(angle));
      y = centerY - len*sin(radians(angle));
      ellipse(x, y, d,d);
  }
   fill(0);
   text("off", centerX/2, height-10);
   text("|", centerX, height-10);
   text("on", 3*centerX/2, height-10);
}


