//ラケットボール
float x = 125.0; // X-coordinate
float y = 0; // Y-coordinate
float radius = 5.0; // Radius of the circle
float speedX = 2; // Speed of motion on the x-axis
float speedY = 2; // Speed of motion on the y-axis
int directionX = 1; // Direction of motion on the x-axis
int directionY = -1; // Direction of motion on the y-axis
int racketW = 50;
int rx;  //マウスの位置　画面内に留める
int ry = 200; //ラケットの上からの位置
boolean gameover = false;
PFont myFont;
int point=0;
int gx, gy, gh=10, gw=100;
void setup() {
  size(250, 250);
  noStroke();
  ellipseMode(RADIUS);
   myFont = loadFont("BookmanOldStyle-Bold-14.vlw");
  textFont(myFont);
  gx = width/2 - gw/2;
  gy = 0;  
}

void draw() {
  background(0);
  if(gameover){
    noLoop();
    text("Game over",width/2-40, height/2); 
  }

  fill(200, 0,0);
  rx = constrain(mouseX, 0, width-racketW);
  rect(rx, ry, racketW, 20); //racket
  rect(gx, gy, gw, gh);      //goal
  x += speedX * directionX;
  y += speedY * directionY;

  if (x > width-radius) {   // right wall
     x = width -radius;
     directionX = -directionX; // Change direction
     speedX = random(2, 8);
     speedY = random(2, 5);
  } else if (x < radius) { // left wall
     x = radius;
     directionX = -directionX; // Change direction
     speedX = random(2, 8);
     speedY = random(2, 5);
  }
  if (y > ry-radius && y < ry+20 &&  x > rx && x < rx+racketW) { //ラケットsurface
     directionY = -directionY; // Change direction
     y = ry-radius;
  }else if (y < radius) {     // 上
     if(x>gx && x<gx+gw) point=point +1; //ゴールに当たった
     directionY = -directionY; // Change direction
     speedX = random(2, 8);
     speedY = random(2, 5);
     y = radius;
  }else if(y > height-radius){   // 下
     gameover = true;
  }
  fill(255);
  ellipse(x, y, radius, radius);
  text("Point: " + point, 10, 30);
}

void mouseReleased() {
  if(gameover){
    gameover = false;
    x = 0;
    y = 0;
    point = 0;
    loop();
  }
}

