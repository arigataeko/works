//スクロールバーで円が大きくなる


Scrollbar bar;
int SW = 200;   //スクロールバーの幅
int SH = 15;    //スクロールバーの高さ
float d;

void setup(){
  size(250,250);
  bar = new Scrollbar(250/2-SW/2, 20, SW, SH, 0, 170);
}

void draw(){
   background(255);
   bar.update();
   bar.display();
   d= bar.getPos();
   fill(225, 0, 0);
   noStroke();
   ellipse(width/2, height/2+SH, d, d);
}

class Scrollbar {
  float x, y; // バーの位置
  float sw, sh; // バーの幅と高さ
  float pos; // ノブの位置
  float posMin, posMax; // ノブの位置の最小値、最大値
  boolean rollover; // マウスが上にあればtrue
  boolean locked; // スクロールバーがアクティブならtrue
  float minVal, maxVal; // バーが返す値の最小、最大
  
  //コンストラクタ
  Scrollbar(float xp, float yp, float w, float h, float miv, float mav) {
    x = xp;
    y = yp;
    sw = w;
    sh = h;
    minVal = miv;
    maxVal = mav;
    pos = x + sw / 2 - sh / 2;
    posMin = x;
    posMax = x + sw - sh;
  }

  // バーの上にマウスがあり、プレスされているなら、ノブの位置を計算
  void update() {
    if (over() == true) {
      rollover = true;
    } else {
      rollover = false;
    }
    if(mousePressed && rollover) {
      locked = true;
    }else{
      locked = false;
    }    
    if (locked) {
      pos = constrain(mouseX - sh / 2, posMin, posMax);
    }
  }
  
  // マウスがバーの上にあれば、trueを返す
  boolean over() {
    if ((mouseX > x) && (mouseX < x + sw) && (mouseY > y) && (mouseY < y + sh)) {
      return true;
    } else {
      return false;
    }
  }

  // バーを描く
  void display() {
    fill(255);
    stroke(0);
    rect(x, y, sw, sh);
    if (rollover || locked) {
      fill(0);
    } else {
      fill(102);
    }
    rect(pos, y, sh, sh);
  }

  // ノブの位置を返す
  float getPos() {
    float scalar = sw / (sw - sh);
    float ratio = (pos - x) * scalar;
    float offset = minVal + (ratio / sw * (maxVal - minVal));
    return offset;
  }
}

