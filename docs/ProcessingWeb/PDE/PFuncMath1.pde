boolean f = false;
float r = 50;
float a = 0; //角度(度単位)
float x, y;
void setup() {
  size(150,150);
  fill(200,0,0);
  noStroke();
  background(255); 
  noLoop();
}
void draw() {
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  x = r * cos(radians(a));
  y = r * sin(radians(a));
  ellipse(x, y, 10, 10);  //画面中央に円
  a = a + 1; //1度ずつ右へ回る
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


