// 円の２つの列が中央で衝突、左右へ往復する
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

int nn = 6; // 円の数
float ss = 2; //移動速度
int kk = 2; //間隔の調整
float d = 10; // 円の直径
float x1[]  = new float[nn]; // 位置(x座標)
float s1[] =  new float[nn]; // 移動速度
float x2[]  = new float[nn]; // 位置(x座標)
float s2[] =  new float[nn]; // 移動速度
boolean on1[] =  new boolean[nn]; // 登場したかどうか
boolean on2[] =  new boolean[nn]; // 登場したかどうか

void setup() {
  size(150, 150);   //描画するための画面
  noStroke();
  s1[0]=ss;  s2[0]=-ss;
  x2[0]= width - d/2;
  for(int i=1;i<x1.length;i++){  
    x1[i]= x1[i-1] - (d+kk);
    s1[i] = ss;
    x2[i]= x2[i-1] + (d+kk);
    s2[i] = -ss;
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア   
     for(int i=0;i<x1.length;i++){
        x1[i] = x1[i]+s1[i];     
        x2[i] = x2[i]+s2[i];    
        if(x1[i] > 0 && !on1[i]) on1[i] = true;
        if(x2[i] < width  && !on2[i]) on2[i] = true;
     
        if(x1[i]>x2[i]-d){ //衝突
           x1[i] = x2[i]-d;
           s1[i] = -s1[i];
           x2[i] = x1[i]+d;
           s2[i] = -s2[i];
        }else{
           if(on1[i] && x1[i]<d/2){ //左の列、左の壁
              x1[i] = d/2;
              s1[i] = -s1[i];
           }else if(on2[i] && x2[i]>width-d/2){ //右の列, 右の壁
              x2[i] = width-d/2;
              s2[i] = -s2[i];
           }
        }
        fill(200,0,0); //左の列は赤
        ellipse(x1[i], height/2, d, d);
        fill(0);       //左の列は黒
        ellipse(x2[i], height/2, d, d);
     }
}


