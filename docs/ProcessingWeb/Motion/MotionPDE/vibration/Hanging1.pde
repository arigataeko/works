// 2つの円がばねでつながっている。ひとつの円について動く
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

Spring obj1; 
Spring obj2; 

float gravity = 3.5;
float mass = 7.0;
float st = 0.2;
float da = 0.7;
float d =20;  //円の直径
float mX, mY;  //動かす
float oriX, oriY;
int dist=5;

void setup() {
  size(150, 150);   //描画するための画面
  oriX = width/2;
  oriY = height;
  obj1 = new Spring(oriX, oriY, mass, gravity, d, st, da, color(0,0,0));
  obj2 = new Spring(oriX, oriY+d, mass, gravity, d, st, da, color(200,0,0));
  mX=width/2.0;
  mY=height/4.0;
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     obj1.recalc(mX, mY);
     obj1.drawObj();
     obj2.recalc(obj1.x, obj1.y);
     obj2.drawObj();
    
     if(sqrt((obj1.x-mX)*(obj1.x-mX) + (obj1.y-mY)*(obj1.y-mY)) < 20) { 
       //上のボールの位置はランダムに動かす
       mX = random(0, width);
       mY = random(0, height);
     }
     
    
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


