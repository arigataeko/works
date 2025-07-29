void setup() {
  size(250, 250);
  noFill();
}

void draw(){
   if(mousePressed){ 
     drawDoshin(mouseX, mouseY, 5, 15, 1.25);
   }
}
void drawDoshin(float x, float y, float d, int n, float dif) {
  float w = d;
  for (int i=1; i<=n; i=i+1) {
    w = w * dif;
    ellipse(x, y, w, w);
  }
}



