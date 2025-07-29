// マウスクリックでキャラクタがジャンプ
/* @pjs preload="images/boys/boy1.png,
                 images/boys/boy2.png,
                 images/boys/boy3.png,            
                 images/boys/boy4.png,                 
                 images/boys/boy5.png, 
                 images/boys/boyJump.png,
                 images/boys/back.png            
                 "; */ 
PImage[] gazou;         //画像を格納する配列
PImage jump;
PImage road;
int cell = 5;         //画像の数
int number = 0;       //表示する画像の番号
int x, y;
int speed = -10; //向かって左から右へ動く
boolean f = false;

void setup(){
  size(500, 250);
  gazou = new PImage[cell];
  for (int i = 1; i <= gazou.length; i++) {   //画像のロード
    gazou[i-1] = loadImage("images/boys/boy" + i + ".png");
  }
  jump =  loadImage("images/boys/boyJump.png");
  road =  loadImage("images/fieldH.png");
  frameRate(10); 
  x = width/2 - jump.width/2;
  y = height-jump.height;
  image(road, 0, 0);
  image(gazou[0], x, y);
  noLoop();
}

void draw() {
  //image(road, 0, 0);
  int shift = frameCount % road.width;  //画像の幅が1000なら0から999に変化
  shift = (road.width - 1) - shift; // 画像の幅が1000なら999から０へ変化させる(左へ動かす）
  for (int i = -shift; i < width; i += road.width) {
    copy(road, 0, 0, road.width, height, i, 0, road.width, height);
  }
  if (!mousePressed) { //ジャンプ中でなければ、アニメーション
    number++;  
    number = number%cell;  //次に表示する画像の番号
    y = height-jump.height;
    image(gazou[number], x, y);
  } else {
    y = 0;
    image(jump, x, y);
  }
}


void keyPressed() {
  if (key == 's' && f) {  //キー入力がsなら
    noLoop();
    f = false;
  } else if (key == 'g' && !f) {//キー入力がgなら
    loop();
    f = true;
  }
}
