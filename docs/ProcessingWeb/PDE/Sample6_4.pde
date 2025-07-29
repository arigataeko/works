// ばねの運動

float dy; // 速度
float y; // 位置
float g = 0.9; //重力加速度
float mass = 7;//質量
float stiffness = 0.15;//ばねの強さ
float damping = 0.98; //減衰
//ゆれを抑える係数 値が小さいと揺れが小さくなる
int r = 5; // 円の半径
float mY = 50;   //ばねの長さ

void setup() {
  size(125, 250);
  fill(0);
  y = mY;
}

void draw() { 
  background(255);   //モニタ画面の背景を白でクリア   
  if (mousePressed) {
    y = mouseY;
  }else{
    calcPos();
  }
  line(width/2, 0, width/2, y);
  ellipse(width/2, y, r*2, r*2);
}

void calcPos() {
  float forceY = (mY - y) * stiffness;  //ばねに働く力
  float ay = forceY / mass;  //ばねによる加速度計算
  dy = damping * (dy + ay + g); //速度計算
  y = y + dy;  //ｙ座標を動かす
}



