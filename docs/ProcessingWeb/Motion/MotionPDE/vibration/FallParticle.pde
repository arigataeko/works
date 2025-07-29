// 円が落下
//マウスで停止、再開
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

int r = 2; // 円の半径
float g =2;
float x, y; // 位置
float dy, dx;  // 移動速度
PBall[]  ball;
int n = 200;  // 円の数

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  ball = new PBall[n];
  x = width/2;
  for(int i=0; i<n; i++){
      dx = random(-3.0, 3.0); // x速度は-2と2の間でランダム
      dy = random(0.1, 1.0); // y速度は0-2の間でランダム
      g = random(0.2, 1.0);  // 重力は0-2の間でランダム
       // x座標,y座標,x速度,y速度,重力,半径を指定して粒子を作る
      ball[i] = new PBall(x, y, dx, dy, g, r);
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     for(int i  = 0; i<n; i++){
       ball[i].ballFall();
       ball[i].drawObj();
     }
}

class PBall {
  float x, y; // position
  float dx, dy; // velocities
  float r; // radius
  float gravity; // 重力加速度
  float friction=0.9;  //減衰
  float orix, oriy;   //最初の位置
  float oridx, oridy; //最初の速度

  PBall(float xpos, float ypos, float sx, float sy, float gra, float rr) {
    x = xpos;
    y = ypos;
    dx = oridx = sx;
    dy = oridy = sy;
    gravity = gra;
    r = rr;
    orix = x; oriy = y;  //元の位置を覚えておく
  }

void ballFall(){
   dy = dy + gravity;  //y方向には重力加速度が加わる
   y = y+dy;       //y座標を動かす
   x = x+dx;       //x座標を動かす     

   if (y>height-r){//下の壁
	y = height-r;  //めり込み調整
        dy = -dy * friction;  //方向反転、減衰
        if(abs(dy)<=g) {  //ほぼ止まったどうかを判定
          x=orix;    y=oriy;  //止まったら、再度落下
          dx = oridx;         //最初の速度に戻す
          dy = oridy;
        }
    }else if(y<r){//上の壁
	y = r - (y-r);  //めり込み調整
        dy = -dy * friction;  //移動方向反転、減衰
    }
   
    if(x>width-r){  //右の壁
         x = width-r;
         dx = -dx * friction;  //方向反転、減衰
     }else if(x<r){ //左の壁
         x = r;
         dx = -dx * friction;  //方向反転、減衰
     }
}
  void drawObj() {
    ellipse(x, y, 2*r, 2*r);
  }
}


