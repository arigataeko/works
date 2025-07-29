// 複数の円が左から右へ波にのって移動する 円の大きさ異なる
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
float d[]  = new float[10]; // 円の直径
float x, y;
float h =50; // 振幅

void setup() {
  size(150, 150);   //描画するための画面
  smooth();
  fill(0);
  d[0]= 2;
  for(int i=1;i<angle.length;i++){
    angle[i] = angle[i-1] - 20;
    d[i]= d[i-1] +3 ;
  }
}

void draw() { 
     background(255);   //画面背景を白でクリア  
     for(int i=0; i<angle.length; i++){
          x = angle[i]*width/360.0;
          y = height/2.0 - sin(radians(angle[i]))*h;
          ellipse(x, y, d[i], d[i]); //個々の大きさで円を描く
          angle[i] = (angle[i] + da) % 360;

     }
}



