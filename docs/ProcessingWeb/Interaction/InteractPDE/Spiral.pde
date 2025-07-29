// マウスx値に応じてらせん状に点を描く
float x,y,t;
float a = 2.0;
int wide=150;        // 画面の高さ

void setup() {
  size(wide, wide);   //描画するための画面
  strokeWeight(3);
}

void draw() { 
  background(255);
  beginShape();
  for(int i=0; i<=mouseX; i++){
     t=  map(i, 0, wide, 0, 360*8);
     x = a * radians(t) * cos(radians(t)) + width/2;
     y = a * radians(t) * sin(radians(t)) + height/2;
     curveVertex(x,y);
  }
    endShape();
}

