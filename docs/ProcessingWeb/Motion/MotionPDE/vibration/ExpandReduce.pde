// 円が縮小拡大
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

float d; // 円の直径
float dd = 0.05; //直径の変化の割合(イージング係数)

void setup() {
  size(150, 150);   // 描画するための画面
  fill(100);       //塗りつぶす
  noStroke();      //線なし
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     if (d>width-1 || d<1) {
        dd = -dd;
     }
     if(dd>=0){ //増加している時
       d = d + (width - d) * dd; //最大値widthとの差のdd分変化
     }else{ //減少している時
       d = d + (d - 0) * dd; //最小値0との差のdd分変化
     }  ;
     ellipse(width/2, height/2, d, d);
}


