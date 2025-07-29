// 単振動　線が加速的に伸縮　画面回転
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
float angle; // 
float da = 4; //変化量

void setup() {
   size(150,150);
   len = width/2.0 - 5;    
   strokeWeight(5);   // 線の太さ
}

void draw() { 
    background(255);   //画面の背景を白でクリア
    translate(width/2, height/2);  //座標原点を画面中央へ移動
    angle = (angle + da) % 360; //角度をdaずつ増加、360を超えない
    x =len * sin(radians(angle));
    line(0, 0, x, y);
}


