float x= 5;
float s = 1;
float a = 0.1;

boolean f = false;

void setup() {
  size(250, 125);
  noLoop();
}
void draw() {
  background(255);
  s = s + a;
  x = x + s;
  ellipse(x, height/2, 10, 10);
  if (x >= width) { 
     s = 1;
     x = 5; 
   }
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

