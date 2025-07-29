// 複数の円が左から右へ円上を移動する
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
float x, y;
float d = 10; // 円の直径
float len = 60; // 軌跡の円の半径

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
  for(int i=1;i<angle.length;i++){
    angle[i] = angle[i-1] - 15;
  }
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
    
     for(int i=0; i<angle.length; i++){
          x =len * cos(radians(angle[i])) + width/2.0;
          y =len * sin(radians(angle[i])) +  height/2.0;
          ellipse(x, y, d, d);
          angle[i] = (angle[i] + da) % 360; //角度をdaずつ増加、360を超えない
     }
}


