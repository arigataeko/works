//円が円周上を運動
boolean f = false;
float x,y;
float r = 100;
float a = 0; //3時の位置からの角度(度単位)
float speed = 2.0;
void setup() {
  size(250,250);
  noFill();
  strokeWeight(2);
  noLoop();
}
void draw() {
  background(255);
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  x = r * cos(radians(a));  //角度aの位置の座標を計算
  y = r * sin(radians(a));
  ellipse(x, y, 10, 10); 
  a = a + speed; //角度を変化させる
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


