// 1つの円が自由落下
// 加速度と減衰

float g =1.8;
float friction=0.95;  //減衰
float y;
float dy;
int r = 5; // 円の半径

boolean f = false;

void setup() {
  size(125, 250);
  fill(0);
  noLoop();
}

void draw() { 
  background(255);   //モニタ画面の背景を白でクリア   
  ballFall();
  ellipse(width/2, y, r*2, r*2);
}

void ballFall() {
  dy = dy + g;
  y= y+dy;       //ｙ座標を動かす

  if (y>height-r) { //下の壁
    y = height-r;  //めり込み調整
    dy = -dy * friction;
    if (abs(dy)<=g/2) { //ほぼ止まった
      dy=0; 
      y=0;
    }
  }
}

void mouseClicked() {
  if (f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}


