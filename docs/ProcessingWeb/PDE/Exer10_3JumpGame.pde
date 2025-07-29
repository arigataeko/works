PImage road;
PFont font;
Boy character;
Rat obst;
ButtonRect b;
boolean f = false;

void setup() {
  size(400, 400);
  character = new Boy(width - 100, height-150, 60, 7, 50);
  obst = new Rat(-60, height-90, 60);
  b = new ButtonRect(0, height-30, 60, 30, "replay", 16);
  b.setFillColor(color(255, 255, 0));
  b.setStrokeColor(color(255, 255, 0));
  road =  loadImage("images/fieldH.png");
  font = createFont("Courier New Bold", 32);
  
  frameRate(15);
  noLoop();
}

void draw() {
  int shift = frameCount % road.width;  //画像の幅が1000なら0から999に変化
  shift = (road.width - 1) - shift; // 画像の幅が1000なら999から０へ変化させる(右へ動かす）
  for (int i = -shift; i < width; i += road.width) {
    copy(road, 0, 0, road.width, height, i, 0, road.width, height);
  }
  if (random(1) < 0.3) {  //ランダムなタイミングで登場
    if (!obst.go) obst.go = true;
  }
  obst.show();
  obst.move();

  character.show();
  character.move();
  b.display();

  if (character.hits(obst)) {
    textFont(font);
    text("game over", width/2, height/2-10);
    obst.go = false;
    obst.x = -60;
    character.vy = 0;
    noLoop();
  }
}


void keyPressed() {
  if (key == ' ') {
    character.jump();
  } else if (key == 's' && f) {  //キー入力がsなら
    noLoop();
    f = false;
  } else if (key == 'g' && !f) {//キー入力がgなら
    loop();
    f = true;
  }
}

void mousePressed() {
  if (b.over()) {
    loop();
  }
}
class Boy {
  float w, h, x, y, vy, gravity;
  float baseY;   //ジャンプしていないときのy位置
  float jumpSpeed;

  PImage[] gazou;         //画像を格納する配列
  int cell = 5;         //画像の数
  int number = 0;       //表示する画像の番号
  Boy(float xpos, float ypos, float haba, float g, float jumpS) {
    gazou = new PImage[cell];
    for (int i = 1; i <= gazou.length; i++) {   //画像のロード
      gazou[i-1] = loadImage("images/boys/boy" + i + ".png");
    }
    w = haba;  //キャラの表示幅
    h = 160 * (w/90.0);  //表示高さ、同じ比率で小さく
   // h = gazou[0].height * (w/gazou[0].width);  //表示高さ、同じ比率で小さく
    x = xpos; 
    y = ypos;
    baseY = ypos;
    jumpSpeed= jumpS;
    gravity = g; //落ちる加速度
  }

  void jump() {
    if (y == baseY) {
      vy = -jumpSpeed;
    }
  }

  boolean hits(Rat obst) {
    float x1 = x + w * 0.5; //画像の中心
    float y1 = y + h * 0.5;
    float x2 = obst.x + obst.w * 0.5;  //画像の中心
    float y2 = obst.y + obst.h * 0.5;
   // println(x1 + " " + y1 + " " + x2 + " " + y2 + " di: " + dist(x1, y1, x2, y2));
    return dist(x1, y1, x2, y2) < (w + obst.w) * 0.3;
  }

  void move() {
    y += vy;  //スピード分y位置を変更
    vy += this.gravity;  //加速度分スピードを変更
    y = constrain(y, 0, baseY);//キャラの位置は画面内
  }

  void show() {
    number++;  
    number = number%cell;  //次に表示する画像の番号
    image(gazou[number], x, y , w, h);
  }
}
class ButtonRect {
  float x, y;      // Position of square button
  float h;         // Height of rect
  float w;         // Width of rect
  color rectColor, lineColor; // color for fill and stroke
  color rectHighlight;  // color when mouse is over
  PFont font;           // Font for lable
  String label;         // String for label of button
 
  ButtonRect(float posx, float posy, float rW, float rH, String label, int fontsize) {
    rectColor = color(255);
    lineColor = color(255);
    rectHighlight = color(204);
     
    x = posx;
    y = posy;
    w = rW;
    h = rH;
    this.label = label;
    font = createFont("Courier New Bold", fontsize);
  }

  void setFillColor(color c){
     rectColor = c;
  }
    void setStrokeColor(color c){
     lineColor = c;
  }
  void display() {
    if (over()) {
      fill(rectHighlight, 100);
    } else {
      fill(rectColor);
    }
    stroke(lineColor);
    rect(x, y, w, h);
    fill(0);
    textAlign(CENTER, CENTER);
    textFont(font);
    text(label, x+w/2, y+h/2);
  }

  boolean over() {  //when mouse is over, return true.
    if (mouseX >= x && mouseX <= x+w && 
      mouseY >= y && mouseY <= y+h) {
      return true;
    } else {
      return false;
    }
  }
}
class Rat {
  float w, h;
  float x, y;
  float speed = 15;
  PImage oImg;
  boolean go = true;
  Rat(float xpos, float ypos, float haba) {
    oImg = loadImage("images/ratLeft.png");
    w = haba;  // 200 x 131
    h = 131 * w/200.0;
    //h = oImg.height * w/oImg.width;
    x = xpos;
    y = ypos; 
  }

  void move() {
    if (go) {
      x += speed;
    }
    if (x > width+w) {
      go = false;
      x = -w;
    }
  }

  void show() {
    image(oImg, x, y, w, h);
  }
  
}

