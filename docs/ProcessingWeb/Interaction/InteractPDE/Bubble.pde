// マウスを早く動かすと大きな円が描かれる。
// マウスクリックで画面がクリアされる。

float henka;   //マウスの移動距離

void setup() {
  size(150, 150);
  frameRate(30);    
  background(100);
  fill(255, 200); //透明度を指定
}

void draw() {
   henka = dist(mouseX, mouseY, pmouseX, pmouseY); //変化量
   ellipse(mouseX, mouseY, henka, henka);   
}

void mouseClicked(){
   background(100); // 画面クリア
}


