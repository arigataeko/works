// 複数の画像を切り替えて表示
PImage[] gazou;         //画像を格納する配列
int cell = 15;         //画像の数
int number = 0;       //表示する画像の番号
int x, y;
boolean f = false;
void setup(){
  size(250, 250);
  gazou = new PImage[cell];
  for (int i = 1; i <= gazou.length; i++) {   //画像のロード
    gazou[i-1] = loadImage("images/ball/change" + i + ".png");
  }
  frameRate(30); 
  noLoop();
}

void draw(){   
   background(255);
   number++;  
   number = number%cell;  //次に表示する画像の番号
   x = width/2 -gazou[number].width/2;
   y = height/2 -gazou[number].height/2;
   image(gazou[number], x, y);
}
void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

