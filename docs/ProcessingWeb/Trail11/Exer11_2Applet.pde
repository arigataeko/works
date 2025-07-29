//円がらせんを運動
import ddf.minim.*;
Minim minim;  //Minim用変数
AudioPlayer [] sound;  //音声ファイルデータ
AudioPlayer s;  //音声ファイルデータ
int tones = 25; 
float step;
boolean f = false;
int NUM = 60;
float x[] = new float[NUM];
float y[] = new float[NUM];
float r;
float a = 0; //角度(度単位)
float speed = 2.0;
float d;
int pre; //前に鳴らしたボール

void setup() {
  size(500,500);
  r= width/2;
  colorMode(HSB, 100);
  minim = new Minim(this);  //Minimオブジェクト生成
  sound = new AudioPlayer[tones];
  for (int i = 1; i <= sound.length; i++) {
    sound[i-1] = minim.loadFile("A/A" + i + ".mp3");
  }     //  ↑音のロード
  step = (width/2) / tones;
  noLoop();
}
void draw() {
  background(100);
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  stroke(0);
  line(0,0,-width/2, 0);
  noStroke();
    //println(x[20] + ", " + y[20] +  " d:" + d );
  for(int i=0; i<NUM; i++){  //aの角度の中にNUM個の円が均等に入る
    x[i] = r/NUM*(NUM-i) * cos(radians(a/NUM*(i+1)));
    y[i] = r/NUM*(NUM-i) * sin(radians(a/NUM*(i+1)));
    fill(map(i, 0, NUM-1, 0, 100), 100, 100);
    d = map(i, NUM-1, 0, 10, 25);
    ellipse(x[i], y[i], d, d); 

    if(x[i] >= -width/2 && x[i] <=0 && y[i] >= -0.5 && y[i]<=0.5){
      int n = (int)abs(x[i] / step);
      
      if(pre != i){
        // println("i: " + i + "("+ x[i] + ", " + y[i] +  ")  d:" + d + " n:" + n);
        sound[n].rewind();  //先頭に巻き戻す
        sound[n].play();  //再生
      }
      pre = i;
    }
  }
  a = a + speed ;  //角度を変化させる

}

void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    background(255);
    f = true;
  }
}

