// ２つの円が中央で衝突する。壁にあたって、衝突を繰り返す。
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
float x1, x2; // 位置(x座標)
float s1 = 2, s2 = -2; // 移動速度

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  x1 = d/2;  //左側の円の最初の位置
  x2 = width-d/2;  //右側の円の最初の位置
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     x1 = x1+s1;  //進める
     x2 = x2+s2;  //進める    
     if(x1>x2-d){ //衝突した
         x1 = x2-d;
         s1 = -s1;
         x2 = x1+d;
         s2 = -s2;
      }else{ //壁に当たったかを判定
        if(x1<d/2){//左側の円、左の壁より左に来た
         x1 = d/2;
         s1 = -s1;
        }
        if(x2>width-d/2){//右の円、右の壁より右に来た
         x2 = width-d/2;
         s2 = -s2;
        }
      }
     ellipse(x1, height/2, d, d);
     ellipse(x2, height/2, d, d);
}


