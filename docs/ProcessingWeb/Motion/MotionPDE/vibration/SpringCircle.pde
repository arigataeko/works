// 円がばねの先についていて、揺れる
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
float gravity = 0;
float mass = 7.0;
float d =10;  //円の直径
float mX, mY;  //動かす
float oriX, oriY;
boolean move = false;

void setup() {
  size(150, 150);   //描画するための画面
  oriX = width/2;
  oriY = height/2;
  obj1 = new Spring(oriX, oriY, mass, gravity, d);
  mX=width/2;
  mY=height/2;  
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     if(move){
       obj1.recalc(mX, mY);
       if((obj1.dy<0.001 && obj1.dy>-0.001)){
         move = false;        //ほぼ止まった
       }
     }else{   //止まったら、円を下へ動かして、ばね運動を始める
       obj1.y += 3;
       if(obj1.y >= height) { move = true; }
     }
     obj1.drawObj();
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


