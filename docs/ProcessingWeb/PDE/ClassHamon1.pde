// 波紋をひとつ作る
// クリックでオンオフ

boolean start = false;
void mouseClicked(){
  if(!start) {
    start = true;
  }else{
    start = false;
  }
}

AHamon hamon; //AHamonオブジェクトを保存するための変数

void setup() {
  size(250, 250);     
  hamon = new AHamon(200); //円の最大値を指定して、波紋のオブジェクトを生成
}

void draw() {
   strokeWeight(0); //背景画面の四角には線を付けない
   fill(255, 55);  //色は白、透明度を指定
   rect(0,0,width, height); //背景を四角で塗りつぶす
   if(start && !hamon.move){//開始されて、で動いていないとき
       hamon.prepare(random(width), random(height));  //新しい位置で、波紋を開始
   }
   hamon.display();
}

class AHamon{
  int d;           //直径
  float x, y;      //円の中央
  float max;       //円の最大値
  int dr = 5;      //円の直径の変化量
  boolean move= false;  //動いているか否か
  AHamon(float limit){
    max = limit;
  }
  void prepare(float xx, float yy){    //波紋のひろがりを開始
    move=true;
    x = xx;
    y = yy;
    d= 0;  //大きさをはじめに戻す。
  }

  void display(){
   strokeWeight(2);
   if(move){   //動いている間の処理
      d=d+dr;   // 大きさを増加
      ellipse(x, y, d, d);  // 円を描く
      if(d>max){ //最大値を越えたので止める。
         move = false;
       }
    } 
  }
}


