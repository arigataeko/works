//円が円周上を運動 円の大きさを変える
boolean f = false;
int NUM = 80;
float x[] = new float[NUM];
float y[] = new float[NUM];
float r = 100;
float a = 0; //角度(度単位)
float speed = 2.0;
void setup() {
  size(300,300);
  noFill();
  strokeWeight(2);
  noLoop();
}
void draw() {
  background(255);
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  for(int i=0; i<NUM; i++){  //aの角度の中にNUM個の円が均等に入る
    x[i] = r * cos(radians(a/NUM*(i+1)));
    y[i] = r * sin(radians(a/NUM*(i+1)));
    ellipse(x[i], y[i], i, i); //円の大きさ1,2,3,,と変える
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


