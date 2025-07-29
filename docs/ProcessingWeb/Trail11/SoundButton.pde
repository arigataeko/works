class SoundButton {
 int x, y;
 int size;
 boolean over;
 boolean press;
 boolean locked;
 color c;
 
 SoundButton(int xx, int yy, int d, color cc){
   x = xx;
   y = yy;
   size = d;
   c = cc;
 }

 void update(){
   if(dist(x, y, mouseX, mouseY) <= size/2){
     over = true;
   }else{
     over = false;
   }
   
   if(over && mousePressed){
     press = true;
   }else{
     press = false;
   }
 }
 
 void display() {
   if(over){
     fill(200);
   }else{
     fill(c);
   }
    ellipse(x, y, size, size);
 }

 
}
