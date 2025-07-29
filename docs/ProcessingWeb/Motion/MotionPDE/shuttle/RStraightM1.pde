// 複数の円が左右へ往復する
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
float x[]  = new float[10]; // 位置(x座標)
float s[] =  new float[10]; // 移動速度
boolean on[] =  new boolean[10]; // 登場したかどうか

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  s[0]=3;
  for(int i=1;i<x.length;i++){  
    x[i]= x[i-1] - (d+5);
    s[i] = 3;
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     for(int i=0;i<x.length;i++){
        x[i] = x[i]+s[i];     
        if(!on[i] && x[i]>0) on[i] = true;   //登場した
        if(x[i]>width-d/2){//登場中の円が右の壁より右に来た
            x[i] = width-d/2;
            s[i] = -s[i];
        }else if(on[i] && x[i]<d/2){//登場中の円が左の壁より左に来た
           x[i] = d/2;
           s[i] = -s[i];
        }
           
        ellipse(x[i], height/2, d, d);
     }
}


