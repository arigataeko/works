// 円が加速度的に左右へ往復する

int r = 10; // 円の直径
float x = r/2; // 位置(x座標)
float s = 0.2; // 移動速度
float a = 0.25; // 加速度

boolean f = false;

void setup() {
  size(250, 125);   //描画するための画面
  fill(0);
  noLoop();
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア   
     s = s+a;
     x = x+s;     
     if(x>width-r/2){//右の壁
         x = width-r/2;
         s = -1;
         a = -a;
      }else if(x<r/2){//左の壁
         x = r/2;
         s = 1;
         a = -a;
      }
     ellipse(x, height/2, r,r);
}

void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

