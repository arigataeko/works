// 複数の円が左から右へ移動する

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

float s = 2; // 移動速度
float x[]  = new float[10]; // 位置(x座標)
float d = 10; // 円の直径

void setup() {
  size(150, 150);
  fill(0);
  for(int i=1;i<x.length;i++){
    x[i]= x[i-1] - (d+5);
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア
     for(int i=0;i<x.length;i++){
         x[i] = x[i]+s;  // 位置を変化
         if(x[i] >= width + d/2){ //右壁内に入った
           x[i] = -d/2; //左壁内に置く
         }
         ellipse(x[i], height/2, d, d);
     }
}


