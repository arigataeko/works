// 点が円周上を移動する
// マウスのx座標に応じて移動速度を変える

int wide = 150;
float r = 60;    //円の半径
float x, y;      //円の位置
float angle;  //速度(角度の速度)
float ds;     //加速度(速度の変化値)
float max = 20;  //　加速度の最大値

void setup() {
  size(wide, wide);     // 画面サイズの設定
  strokeWeight(10);
}

void draw() {
   noStroke();
   fill(255, 75);  //色は白、透明度を指定
   rect(0,0,width, height); //背景を四角で塗りつぶす
   stroke(0);      //黒で描く
   ds = map(mouseX, 0, wide, 0, max);
   angle = (angle + ds)%360; //一周したら0に戻す
   x = r*cos(radians(angle)) + width/2;
   y = r*sin(radians(angle)) + height/2;
   point(x, y);   //点を描く
}



