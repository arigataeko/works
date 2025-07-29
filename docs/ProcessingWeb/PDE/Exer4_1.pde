void setup() {
  size(250, 250);
  noFill();
}

void draw(){
   if(mousePressed){ 
     drawDoshin(mouseX, mouseY, 10);
   }
}
void drawDoshin(float x, float y, float d) {
  for (int i=1; i<=10; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}



