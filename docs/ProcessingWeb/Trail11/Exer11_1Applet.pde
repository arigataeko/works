// マウスクリックでキャラクタがジャンプ

import ddf.minim.*;
Minim minim;  //Minim用変数
AudioPlayer walk, push;  //音声ファイルデータ
PImage[] gazou;   //画像を格納する配列
PImage jump;
PImage road;
int cell = 5;         //画像の数
int number = 0;       //表示する画像の番号
int x, y;
int speed = -10; //右から左へ動く
boolean f = false;

void setup(){
  size(250, 250);
  gazou = new PImage[cell];
  for (int i = 1; i <= gazou.length; i++) {   //画像のロード
    gazou[i-1] = loadImage("images/boys/boy" + i + ".png");
  }
  jump =  loadImage("images/boys/boyJump.png");
  road =  loadImage("images/boys/back.png");
  frameRate(5); 
  x = width - jump.width;
  y = height-jump.height;
  image(road, 0, 0);
  image(gazou[0], x, y);
  minim = new Minim(this);  //Minim
  walk = minim.loadFile("sounds/puya.mp3");//ファイルロード
  push = minim.loadFile("sounds/puon.mp3");//ファイルロード
 // println("just after load:" + walk.position());
  noLoop();
}

void draw(){   
   image(road, 0, 0);
   number++;  
   number = number%cell;  //次に表示する画像の番号
   x = x + speed;
   if(x < -gazou[0].width) {
      x = width ;
   }
   if(number==1){
     if(walk.position() != 0)
            walk.rewind();  //先頭に巻き戻す
     walk.play();  //再生する
   }
   image(gazou[number], x, y);
}

void mousePressed(){
    if(!f) return;
    noLoop();
    image(road, 0, 0);
    y = 0;
    if(push.position() != 0)
          push.rewind();  //先頭に巻き戻す
    push.play();  //再生する
    image(jump, x, y);
}

void mouseReleased(){
  if(!f) return;
  y = height-jump.height;
  loop(); 
}

void stop(){   
  walk.close(); //音声再生オブジェクトを閉じる
  push.close(); //音声再生オブジェクトを閉じる
  minim.stop();  //Minimオブジェクトをクリア
  super.stop();  //自分でstop()を定義した時、必須
}

void keyPressed(){
  if(key == 's' && f){  //キー入力がsなら
    noLoop();
    f = false;
  }else if(key == 'g' && !f) {//キー入力がgなら
    loop();
    f = true;
  }
}
