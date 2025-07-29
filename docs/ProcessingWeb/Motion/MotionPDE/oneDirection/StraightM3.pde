// 複数の円が左から右へ移動する 円の大きさ異なる

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
float d[]  = new float[10]; // 円の直径

void setup() {
  size(150, 150); 
  fill(0);
  d[0]=2;
  for(int i=1;i<x.length;i++){
    d[i]= d[i-1] +2 ; //円の直径の初期化
    x[i]= x[i-1] - (d[i]+d[i-1])/2.0 -5; //円のx座標の初期化
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア
     for(int i=0;i<x.length;i++){
        x[i] = x[i]+s;
         if(x[i]>=width+d[i]/2) { //右に消えたら、左から現れる
            if(i==0)  x[i] = -d[i]/2 -50;  //最初の円の位置、左壁内部
            else x[i]= x[i-1] - (d[i]+d[i-1])/2.0 - 5; //後は同じ間隔で現れる
         }
         ellipse(x[i], height/2.0, d[i],d[i]);
     }
}


