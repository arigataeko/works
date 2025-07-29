class Rat {
  float w, h;
  float x, y;
 float speed = 15;;
  PImage oImg;
  boolean go = true;
  Rat(float xpos, float ypos, float haba) {
    oImg = loadImage("images/ratLeft.png");
    w = haba;  // 200 x 131
    h = oImg.height * w/oImg.width;
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
