// 1つの円が自由落下
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

float g =1.8;  //加速度
float friction=0.98;  //減衰 1以下の数字
float y;  //y座標
float dy; //y方向の速度
float r = 5; // 円の半径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア   
     ballFall();
     ellipse(width/2, y, r*2,r*2);
}

void ballFall(){
   dy = dy + g;
   y= y+dy;       //ｙ座標を動かす

   if (y>height-r){//下の壁
	y = (height-r);  //壁の上に置く
        dy = -dy * friction;  //速度が減衰
        if(abs(dy)<=g/2) {  //ほぼ止まったら、
          dy=0; y=0;        //再度落下
        }
    }
}


