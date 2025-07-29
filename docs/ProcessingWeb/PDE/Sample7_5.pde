//円がらせんを運動
boolean f = false;
int NUM = 60;
float x[] = new float[NUM];
float y[] = new float[NUM];
float r = 150;
float a = 0; //角度(度単位)
float speed = 2.0;
float d;
void setup() {
  size(300,300);
  noStroke();
  colorMode(HSB, 100);
  noLoop();
}
void draw() {
  background(100);
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  for(int i=0; i<NUM; i++){  //aの角度の中にNUM個の円が均等に入る
    x[i] = r/NUM*(NUM-i) * cos(radians(a/NUM*(i+1)));
    y[i] = r/NUM*(NUM-i) * sin(radians(a/NUM*(i+1)));
    fill(map(i, 0, NUM-1, 0, 100), 100, 100);
    d = map(i, NUM-1, 0, 10, 25);
    ellipse(x[i], y[i], d, d); 
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


