// 複数の円が左から右へ波にのって移動 往復運動
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

float[] angle  = new float[10]; // 位置(角度)
float[] da =  new float[10]; // 角度の変化量
float x, y;
float d = 10; // 円の直径
float h =60; // 振幅
boolean[] on =  new boolean[10]; // 登場したかどうか

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  angle[0] = -10; da[0]=5;
  for(int i=1;i<angle.length;i++){  
    angle[i]= angle[i-1] - 20;
    da[i] = 5;
  }
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     for(int i=0; i<angle.length; i++){
         angle[i] = angle[i] + da[i];
         x = map(angle[i], 0, 360, 0, width);
         y = height/2.0 - sin(radians(angle[i]))*h;
         ellipse(x, y, d, d);
         if(!on[i] && angle[i] > 0) on[i] = true;
         if(on[i] && (angle[i]>360 || angle[i]<0)){//壁
           da[i] = -da[i];
         }
      }
}


