// 複数の円がらせん上を移動　(対数螺旋) 円の大きさ変化
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

int num = 20;
float angle[]  = new float[num]; // 位置(角度)
float da = 5; // 角度の変化量
float x,y;
float a = 10.0;   //らせんの巻き方、大きいと早く広がる
float b = 0.12;   //らせんの巻き方、大きいと早く広がる
float d[] = new float[num]; // 円の直径
float dd=0.2;  //直径の増加量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  for(int i=0;i<angle.length;i++){
    angle[i] = (-40) * i;
    d[i]= 1 ;
  }
}

void draw() { 
   background(255);
   for(int i=0; i<angle.length; i++){
      x = a * exp(radians(angle[i]*b)) * cos(radians(angle[i])) + width/2.0;
      y = a * exp(radians(angle[i]*b)) * sin(radians(angle[i])) + height/2.0;
      ellipse(x, y, d[i], d[i]);
      
      angle[i] = angle[i] + da;
      if (angle[i]>360*5) { //画面から消えるほど広がった
        angle[i] = -40;
        d[i] = 1;
      } else if(angle[i]>=0)  { //画面上に登場した
        d[i] = d[i]+dd;  //大きさ増加
      }
   }
}


