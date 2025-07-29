// 円がらせん上を移動　(対数螺旋)

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

float angle;
float da = 5; // 角度の変化量
float x,y;
float a = 5.0;  //らせんの巻き方、大きいと早く広がる
float b = 0.12;  //らせんの巻き方、大きいと早く広がる
float d = 8; // 円の直径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
   background(255);
   x = a * exp(radians(angle)*b) * cos(radians(angle)) + width/2.0;
   y = a * exp(radians(angle)*b) * sin(radians(angle)) + height/2.0;
   ellipse(x, y, d, d);
   if (x<0 && y<0){ //画面から消えるほど広がった
        angle=0;
   } else {
        angle = angle + da;
   }
}


