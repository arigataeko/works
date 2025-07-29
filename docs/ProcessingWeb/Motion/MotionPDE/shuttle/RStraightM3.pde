// 大きさが違う複数の円が左右へ往復する
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

float d[] =  new float[10]; // 円の直径
float x[]  = new float[10]; // 位置(x座標)
float s[] =  new float[10]; // 移動速度
boolean on[]  =  new boolean[10]; // 登場したかどうか

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  s[0]=3; d[0] = 20;  //配列の先頭の値の初期化
  for(int i=1;i<x.length;i++){  
    d[i] = d[i-1] -2;  //円の直径の初期化　2ずつ小さくなる
    x[i]= x[i-1] - (d[i]+d[i-1])/2 - 5; //円のx座標の初期化
    s[i] = 3;   //円の移動速度の初期化
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     for(int i=0;i<x.length;i++){
        x[i] = x[i]+s[i];     
        if(x[i] > d[0] && !on[i]) on[i] = true; //登場した
        if( x[i]>width-d[i]/2){  //登場中の円が右の壁より右に来た
            x[i] = width-d[i]/2;
            s[i] = -s[i];
        }else if(on[i] && x[i]<d[i]/2){  //登場中の円が左の壁より左に来た
            if(i==0) x[i] = d[i]/2;
            else  x[i]= x[i-1] - (d[i]+d[i-1])/2 - 5; //円の間隔を保って跳ね返る
            s[i] = -s[i];
        }
        ellipse(x[i], height/2, d[i],d[i]);
     }
}


