// 複数の円が左から右へ移動する 円の大きさ異なる
// 円は出てくると徐々に大きくなる

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

int num = 10;  //円の数
float s = 2; // 移動速度
float x[]  = new float[num]; // 位置(x座標)
float d[]  = new float[num]; // 円の直径
boolean on[] = new boolean[num];   //登場しているかどうか
float dd=0.3;  //直径の増加量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  d[0] = 1;
  for(int i=1;i<x.length;i++){
    d[i] = 1 ;
    x[i] = x[i-1] -15;
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア
     for(int i=0;i<x.length;i++){
         x[i] = x[i]+s;
         if(x[i]>=width+d[i]/2) { //右に消えたら、左から現れる
            on[i] = false;
            x[i] = -15;  //左の隠れた位置から出る
            d[i] = 1;
         }else if(x[i]>=0) {
            on[i]=true;
         }
         if(on[i]) d[i] = d[i]+dd;
         ellipse(x[i], height/2, d[i],d[i]);
     }
}


