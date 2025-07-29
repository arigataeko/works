// 円が2次方程式上を振動運動
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


float angle; // 位置(角度)
float x, y;
float d = 10; // 円の直径
float a = -0.05; // 二次式の係数
float len = 60; // 軌跡の円の半径
float dx = 1;  //x座標の変化量

void setup() {
  size(150, 150);   //描画するための画面
  fill(0);
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     translate(width/2.0, height-10); //座標原点の移動
     if (x>45 || x<-45) { //x座標の動く範囲
        dx = -dx;
     } 
     x = x + dx;    //ｘ座標を動かす
     y = a * x * x; //二次関数の計算
     ellipse(x, y, d, d);
}



