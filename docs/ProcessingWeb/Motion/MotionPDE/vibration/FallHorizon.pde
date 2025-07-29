// 1つの円が水平方向へ飛び出し、落下
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

float r = 5; // 円の半径
float g =2;  //加速度
float friction=0.92;  //減衰
float x, y; // 位置
float dy, dx=3;  // 移動速度

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア   
     ballFall();
     ellipse(x, y, 2*r, 2*r);
}

void ballFall(){
   dy = dy + g;
   y = y+dy;       //ｙ座標を動かす
   x = x+dx;     

   if (y>height-1-r){//下の壁
	y = height-1-r; //下の壁の上に置く
        dy = -dy * friction;  //方向反転、減衰
        if(abs(dy)<=g/2 && abs(dx)<=g/2) { //ほぼ止まった
          dy=0; y=0; x=0; dx=3;
        }
    }else if(y<r){//上の壁
	y = r;  
        dy = -dy * friction;  //方向反転、減衰
    }
   
     if(x>width-r){  //右の壁
         x = width-r;
         dx = -dx * friction;  //方向反転、減衰
      }else if(x<r){ //左の壁
         x = r;
         dx = -dx * friction;  //方向反転、減衰
      }
}


