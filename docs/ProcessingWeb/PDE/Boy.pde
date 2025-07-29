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
    h = gazou[0].height * (w/gazou[0].width);  //表示高さ、同じ比率で小さく
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
