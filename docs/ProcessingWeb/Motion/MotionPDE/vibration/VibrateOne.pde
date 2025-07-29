// 円が小さく振動
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

VibrateBall cir;
int v = 5; //移動速度の最大値
float x, y ; // 位置(座標)
int d = 20; // 円の直径
int wide = 3; //動く範囲幅

void setup() {
  size(150, 150);   //描画するための画面
  frameRate(30);    //フレームレート
  fill(0);
  cir = new VibrateBall(width/2,height/2, wide, v, d);
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     cir.display();
}

class VibrateBall{
  
  int max; // 移動速度の最大値
  int min; // 移動速度の最小値
  float x, y ; // 位置(座標)
  float originX, originY;
  int d; // 円の直径
  float sx, sy; // 移動速度
  int wide; //動く範囲幅

  VibrateBall(float xx, float yy, int ww, int v, int dd ){
    x = originX = xx;
    y = originY = yy;
    d = dd;
    max = v;
    min = -v;
    wide = ww;
  }

  void display() { 
     sx = random(min, max);  //変化量はランダムに決める
     sy = random(min, max);
     x = x+sx;   
     y = y+sy;       
     if(x>originX+wide){//右
         x = originX+wide;
         sx = -sx;
      }else if(x<originX-wide){//左
         x = originX-wide;
         sx = -sx;
      }
       if(y>originY+wide){//上
         y = originY+wide;
         sy = -sy;
      }else if(y<originY-wide){//下
         y = originY-wide;
         sy = -sy;
      }
     ellipse(x, y, d, d);
  }
}


