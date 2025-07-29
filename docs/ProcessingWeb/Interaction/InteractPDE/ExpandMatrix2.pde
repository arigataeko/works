// 円状に配置された円の大きさが変化
// マウスX位置が閾値以上になると、連続的に円を拡大、縮小
float dr = 2;  //直径の変化量
float d=0;
float x, y;
float angle; // 位置(角度)
float da = 8; // 円周上に描く円の間隔(角度)
float len = 50; // 配置の円の半径
float level;

void setup(){
  size(150, 150);
  level = width/2.0;
  PFont f = createFont("Arial", 14); //文字を描くためのフォントの準備
  textFont(f);
  textAlign(CENTER, CENTER); //描く文字列の中央の座標を指定
}

void draw(){
   background(255); 
   if( mouseX >= level) { //オン(true)のとき
      d = d+dr;          //1増やす
   }
   if(d>width*2) dr = -dr; //拡大縮小の向きを反転
   else if(d<0) dr=-dr;
   noFill();
   for(angle=0; angle<360;  angle = angle + da){
      x =len * cos(radians(angle)) + width/2.0;
      y =len * sin(radians(angle)) +  height/2.0;
      ellipse(x, y, d, d);
   }
   fill(0);//画面下部に、黒で、off | onの文字を描く
   text("off", width/4.0, height-10);
   text("|", width/2.0, height-10);
   text("on", 3*width/4.0, height-10);
}


