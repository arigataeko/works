// 円が左右へ往復する
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

float d = 10; // 円の直径
float x; // 位置(x座標)
float s = 3; // 移動速度

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     x = x+s;     
     if(x>width-d/2){  //右の壁より右に来た
         x = width-d/2;
         s = -s;//速度の正負を反転、運動方向を変える
      }else if(x<d/2){  //左の壁より左に来た
         x = d/2;
         s = -s;//速度の正負を反転、運動方向を変える
      }
     ellipse(x, height/2, d, d);
}


