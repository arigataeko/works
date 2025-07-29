// マウスｘ位置の値が一定値以下なら同心円を描く

float d;        //直径
float level;    // 閾値
void setup() {
  size(150, 150);     // 画面サイズの設定
  noFill();          //塗りつぶさない
  strokeWeight(3);   //線の太さ
  stroke(200, 0, 0);       //線の色
  background(255);
  level = width/ 2.0;
}

void draw(){
   if(mouseX >= level){  //level以上のとき
      d=d+10;  //円の直径を１０ずつ大きくする
      ellipse(width/2, height/2, d, d);
    }else{  //levelより小さいとき
      background(255); // 背景を白に塗る。画面クリア
      d=0;   //直径をゼロに戻す
   }
}

