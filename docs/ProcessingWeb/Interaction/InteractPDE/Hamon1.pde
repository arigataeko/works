// マウスプレスされたら、マウスの位置に波紋が広がり、消える

AHamon hamon; //AHamonオブジェクトを保存するための変数

void setup() {
  size(150, 150);   
  frameRate(30);     
  hamon = new AHamon(width*2); //円の最大値を指定して、波紋オブジェクトを生成
}

void draw() {
   strokeWeight(0); //背景画面の四角には線を付けない
   fill(255, 75);  //色は白、透明度を指定
   rect(0,0,width, height); //背景を四角で塗りつぶす
   if(mousePressed && !hamon.move){//マウスがプレスされ、動いていないとき
       hamon.prepare(mouseX, mouseY);  //マウスの位置で、波紋を開始
   }
   hamon.display();
}

class AHamon{
  int d;           //直径
  float x, y;      //円の中央
  float max;       //円の最大値
  int dr = 5;      //円の直径の変化量
  boolean move= false;  //動いているかいないかのフラグ
  
  AHamon(float limit){
    max = limit;
  }

  void prepare(float xx, float yy){    //波紋を準備
    move=true;
    x = xx;
    y = yy;
    d= 0;  //大きさをはじめに戻す。
  }

  void display(){
   strokeWeight(2); //線の太さを指定
   if(move){   //動いている間の処理
      d=d+dr;   // 大きさを増加
      ellipse(x, y, d, d);  // 円を描く
      if(d>max){ //最大値を越えたので止める。
         move = false;
       }
    }
  }
}


