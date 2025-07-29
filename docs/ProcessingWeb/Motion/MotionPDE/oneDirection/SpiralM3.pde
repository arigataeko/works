// 複数の円がらせん上を移動　(対数螺旋) 円の大きさ変化

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

float angle[]  = new float[10]; // 位置(角度)
float da = 5; // 角度の変化量
float x,y;
float a = 5;   //らせんの巻き方、大きいと早く広がる
float b = 0.12;   //らせんの巻き方、大きいと早く広がる
float d[] = new float[10]; // 円の直径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  d[0] = 2; //列の先頭の円の直径
  for(int i=1;i<angle.length;i++){
    angle[i] = angle[i-1] - 25;
    d[i]= d[i-1] + 2 ;
  }
}

void draw() { 
   background(255);
   for(int i=0; i<angle.length; i++){
      x = a * exp(radians(angle[i])*b) * cos(radians(angle[i])) + width/2.0;
      y = a * exp(radians(angle[i])*b) * sin(radians(angle[i])) + height/2.0;
      ellipse(x, y, d[i], d[i]);
      
      if (angle[i]>360*5) { //画面から消えるほど広がった
        angle[i]=-5;
      } else {
        angle[i] = angle[i] + da;
      }
   }
}


