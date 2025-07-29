// 波紋を50作る
// クリックでオンオフ

boolean start = false;
void mouseClicked(){
  if(!start) {
    start = true;
  }else{
    start = false;
  }
}

AColorHamon[] hamon; //AColorHamonオブジェクトを保存するための配列
int h;   //いくつめの波紋か
int N=50;   //作り出す波紋の数

void setup() {
  size(250, 250); 
  frameRate(10);     
  hamon = new AColorHamon[N];  // N個のAHamonオブジェクト用の領域を確保
  for(int i=0; i<N; i++){
     if(i % 10 == 0) {
        hamon[i] = new AColorHamon(random(100,200), 200, 0, 0); 
     }else {
        hamon[i] = new AColorHamon(random(100,200), 0, 0, random(70,200)); 
     }
  }
}

void draw() {
   strokeWeight(0); //背景画面の四角には線を付けない
   fill(255, 55);  //色は白、透明度を指定
   rect(0,0,width, height); //背景を四角で塗りつぶす
   if(start && !hamon[h].move){//h番目の波紋が動いていなかったら
  //if(!hamon[h].move){
      hamon[h].prepare(random(width), random(height));  //新しい位置で、波紋を開始
      h = (h+1)%N;   //この2行は、 (h+1)%hamon.length; と書いても同じ
   }
   for(int i=0; i<N; i++){
      hamon[i].display();
   }
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


