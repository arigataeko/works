// 円が加速度的に左右へ往復する
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
float x = d/2; // 位置(x座標)
float init = 0.2; //速度初期値
float s = init; // 移動速度
float a = 0.25; // 加速度

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア   
     s = s+a;
     x = x+s;     
     if(x>width-d/2){  //右の壁より右に来た
         x = width-d/2;  //右の壁に接する位置に置く
         s = -init; //左へ進む、速度初期化
         a = -a; //加速度の方向を逆転
      }else if(x<d/2){   //左の壁より左に来た
         x = d/2;  //左の壁に接する位置に置く
         s = init;  //右へ進む、速度初期化
         a = -a; //加速度の方向を逆転
      }
     ellipse(x, height/2, d, d);
}


