// 線が加速的に伸縮
// 線の一方の端点が左右へ移動
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
float len; // 線の長さ
float x, y; // 線のもう一方の座標
float s; // 移動速度
float ds = 0.2; // 加速

void setup() {
  size(150,150);
  strokeWeight(5);   // 線の太さ
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     translate(width/2, height/2);  //座標原点を画面中央へ移動
     if(x>width/2.0) {
        s = 0; //移動速度の初期化
        x = width/2.0;  //右端へのめり込み補正
        ds = -ds;
     }else if(x<-width/2.0){
        s = 0; //移動速度の初期化
        x = -width/2.0; //左端へのめり込み補正
        ds = -ds;
     }
     s = s + ds;
     x = x + s;  // 位置を変化。
     line(0, 0, x, y);
}


