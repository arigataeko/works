// 複数の円がぶら下がって揺れる
boolean f = true;
void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

int n = 6; //円の数
Spring[] obj = new Spring[n];

float gravity = 3.5;
float mass = 5.0;
float st = 0.2;
float da = 0.7;
float d =15;  //円の直径
float mX, mY;  //揺らす円の座標
float mv=3; 
int distance=5;

void setup() {
  size(150, 150);   //描画するための画面
  for(int i=0;i<n;i++){
     obj[i]= new Spring(width/2, height/4+distance*i, mass, gravity, d,
                         st, da, color(0,0,0));
  }
  mX=width/2;
  mY=height/4;
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     obj[0].recalc(mX, mY);  //列の先頭
     obj[0].drawObj();
     for(int i=1;i<n;i++){
       obj[i].recalc(obj[i-1].x, obj[i-1].y);  //列の下の円は上の位置について動く
       obj[i].drawObj();
     }
     mX = mX +mv; //列の先頭の位置を左右に振る
     if(mX>width/2+50) mv=-mv;
     else if(mX<width/2-50)mv=-mv;
}


class Spring {
  float dx, dy; // 速度
  float x, y; // 位置
  float gravity; //重力
  float mass;//質量
  float d = 10; //直径
  float stiffness = 0.1;//ばねの強さ
  float damping = 0.98; //ゆれを抑える係数 値が小さいと揺れが小さくなる
  color c = color(0, 0, 0);  //描く円の色
  
  Spring(float xpos, float ypos, float m, float g, float dd) {
    x = xpos;
    y = ypos;
    mass = m;
    gravity = g;
    d = dd;
  }
  
    Spring(float xpos, float ypos, float m, float g, float dd, float stiff, float damp, color cc) {
    x = xpos;
    y = ypos;
    mass = m;
    gravity = g;
    d = dd;
    stiffness = stiff;
    damping = damp;
    c = cc;
  }
  
  void recalc(float targetX, float targetY) { //位置の計算
    float forceX = (targetX - x) * stiffness;
    float ax = forceX / mass;
    dx = damping * (dx + ax);
    x = x + dx;
    float forceY = (targetY - y) * stiffness;
    forceY = forceY + gravity;
    float ay = forceY / mass;
    dy = damping * (dy + ay);
    y = y + dy;
  }
  
  void drawObj() {
    noStroke();
    fill(c);
    ellipse(x, y, d, d);
  }
}


