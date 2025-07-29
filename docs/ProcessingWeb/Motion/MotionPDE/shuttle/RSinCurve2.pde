// ２つの円が波にのって移動。中央で衝突する。 往復運動
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

float angle1, angle2; // 位置(角度)
float x1, y1, x2, y2;
float d = 10; // 円の直径
float h =60; // 振幅
float da1 = 5; // 角度の変化量
float da2 = -da1; // 角度の変化量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  angle2=720;  //右側の円は右壁から出る
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     angle1 = angle1 + da1;
     angle2 = angle2 + da2;
     x1 = map(angle1, 0, 720, 0, width);
     y1 = height/2.0 - sin(radians(angle1))*h;
     ellipse(x1, y1, d, d);
     x2 = map(angle2, 0, 720, 0, width);
     y2 = height/2.0 - sin(radians(angle2))*h;
     ellipse(x2, y2, d, d);
     if(dist(x1,y1,x2,y2)<d){ //衝突した
         da1 = -da1;
         da2 = -da2;
     }else{ //壁に当たったかを判定
        if(angle1<0 || angle1>720){//壁
          da1 = -da1;
        }
        if(angle2<0 || angle2>720){//壁
          da2 = -da2;
        }
     }
}


