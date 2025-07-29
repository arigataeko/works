float x = 125.0; // X-coordinate
float y = 0; // Y-coordinate
float radius = 5.0; // Radius of the circle
float speedX = 2; // Speed of motion on the x-axis
float speedY = 2; // Speed of motion on the y-axis
int directionX = 1; // Direction of motion on the x-axis
int directionY = -1; // Direction of motion on the y-axis

boolean f = false;

void setup() {
  size(250, 250);
  noStroke();
  ellipseMode(RADIUS);
  noLoop();
}

void draw() {
  background(0);
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
  if ( y > height-radius) { //bottom wall
    directionY = -directionY; // Change direction
    y = height-radius;
  }else if (y < radius) {     // 上
    directionY = -directionY; // Change direction
      speedX = random(2, 8);
      speedY = random(2, 5);
      y = radius;
  }
  fill(255);
  ellipse(x, y, radius, radius);
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

