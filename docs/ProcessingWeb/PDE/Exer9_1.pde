// マウスクリックでキャラクタがジャンプ
/* @pjs preload="images/girls/g1.png,
                 images/girls/g2.png,
                 images/girls/g3.png,            
                 images/girls/g4.png,                 
                 images/girls/g5.png,
                 images/girls/g6.png,
                 images/girls/g7.png,
                 images/girls/g8.png,
                 images/girls/g9.png,
                 images/girls/g10.png,
                 images/girls/haneru.png,
                 images/girls/field.jpg            
                 "; */ 
PImage[] gazou;         //画像を格納する配列
PImage jump;
PImage road;
int cell = 10;         //画像の数
int number = 0;       //表示する画像の番号
int x, y;
boolean f = false;

void setup(){
  size(250, 300);
  gazou = new PImage[cell];
  for (int i = 1; i <= gazou.length; i++) {   //画像のロード
    gazou[i-1] = loadImage("images/girls/g" + i + ".png");
  }
  jump =  loadImage("images/girls/haneru.png");
  road =  loadImage("images/girls/field.jpg");
  frameRate(5); 
  x = (width - gazou[0].width)/2;
  y = height-jump.height;
  image(road, 0, 0);
  image(gazou[0], x, y);
  noLoop();
}

void draw(){   
   image(road, 0, 0);
   number++;  
   number = number%cell;  //次に表示する画像の番号
   image(gazou[number], x, y);
}

void mousePressed(){
    if(!f) return;
    noLoop();
    image(road, 0, 0);
    y = 0;
    image(jump, x, y);
}

void mouseReleased(){
  if(!f) return;
  y = height-jump.height;
  loop(); 
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

