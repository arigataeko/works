// マウスの位置をスイッチのオンオフののように使う。
// x座標が閾値以上なら,ランダムな位置に複数の波紋が広がり、消える。
AColorHamon[] hamon;
float level; // 閾値
int h;   //いくつめの波紋か
int N=50;   //リストの数(円の数)
int wide=150;

void setup() {
  size(wide, wide);
  level=width/2.0;
  frameRate(30);     
  hamon = new AColorHamon[N];
  for(int i=0; i<N; i++){
     if(i % 10 == 0) {  // 10個に1個の割合で色を赤にする
        hamon[i] = new AColorHamon(random(100,200), 200, 0, 0); 
     }else {  //それ以外は、青系でランダムに
        hamon[i] = new AColorHamon(random(100,200), 0, 0, random(70,200)); 
     } 
  }
  PFont f = createFont("Arial", 14); //文字を描くためのフォントの準備
  textFont(f);
  textAlign(CENTER, CENTER); //描く文字列の中央の座標を指定
}

void draw() {
   strokeWeight(0); //背景画面の四角には線を付けない
   fill(255, 75);  //色は白、透明度を指定
   rect(0, 0, width, height); //背景を四角で塗りつぶす
   if(mouseX >= level && !hamon[h].move){ //マウスの位置が閾値以上で動いていないとき
       hamon[h].prepare(random(width), random(height));  //新しい位置で、波紋を開始
       h = (h+1)%N;   //この行は、 (h+1)%hamon.length; と書いても同じ
   }
   for(int i=0; i<N; i++){
      hamon[i].display();
   }
   fill(0);//画面下部に、黒で、off | onの文字を描く
   text("off", width/4.0, height-10);
   text("|", width/2.0, height-10);
   text("on", 3*width/4.0, height-10);
}

class AColorHamon extends AHamon {
  float value1;  // red
  float value2;  //green
  float value3;  //blue

  AColorHamon(float limit) {
    super(limit);
  }

  AColorHamon(float limit, float v1, float v2, float v3) {
    super(limit);
    value1 = v1;
    value2 = v2;
    value3 = v3;
  }

  void display() {
    stroke(value1, value2, value3);  
    super.display();
  }
}
class AHamon {
  boolean move= false;  //動いているかいないかのフラグ
  int d;           //直径
  float x, y;        //円の中央
  float max;       //円の最大値
  int dr = 5;      //円の直径の変化量

  AHamon(float limit) {
    max = limit;
  }
  
  void prepare(float xx, float yy) {    //波紋を準備
    move=true;
    x = xx;
    y = yy;
    d= 0;  //大きさをはじめに戻す。
  }

  void display() {
    strokeWeight(2);
    if (move) {   //動いている間の処理
      d=d+dr;   // 大きさを増加
      ellipse(x, y, d, d);  // 円を描く
      if (d>max) { //最大値を越えたので止める。
        move = false;
      }
    }
  }
}


