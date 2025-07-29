/*
import ddf.minim.*;
Minim minim;
AudioInput in;
*/
/* @pjs preload="images/cat/sara1.jpg,
                 images/cat/sara2.jpg,
                 images/cat/sara3.jpg,
                 images/cat/sara4.jpg,
                 images/cat/sara5.jpg, 
                 images/cat/sara6.jpg, 
                 images/cat/sara7.jpg, 
                 images/cat/sara8.jpg, 
                 images/cat/sara9.jpg                  
                 "; */ 
float volumeIn, d, sa;
float easing = 0.2;
int num  = 9;
PImage[] images = new PImage[num];
boolean limit = false;
int disp=0;
void setup() {
  size(250,250);
//  minim = new Minim(this);
//  in = minim.getLineIn(Minim.MONO, 512);
  frameRate(20);
  for (int i=0; i<num; i++) {
    String imageName = "./images/cat/sara" + (i+1) + ".jpg";
    images[i] = loadImage(imageName);
  }

}

void draw() {
   if(mousePressed &&mouseX>=0 && mouseX<=width){
//  volumeIn=in.left.level()*1000; 
  d = mouseX;
  
 // sa = volumeIn - d;
 // if(abs(sa) > 1) {
 //  d = d + sa * easing;
 // }
  showFace();
  } else {
      image(images[disp], -40, -25);
  }
}
void showFace(){
   if (d>=200) {
    if (limit) {
      disp = 8;
      limit = false;
    } 
    else {
      disp = 7;
      limit = true;
    }
  } 
   else if (d < 200 && d >= 180) {
   disp = 7;
  } 
  else if (d < 180 && d >= 150) {
    disp = 6;
  } 
  else if (d < 150 && d >= 120) {
    disp = 5;
  } 
  else if (d < 120 && d >= 90) {
    disp = 4;
  } 
  else if (d < 90 && d >= 40) {
    disp = 3;
  } 
  else if (d < 40 && d >= 20) {
    disp = 2;
  } 
  else if (d < 20 && d >= 10) {
    disp = 1;
  } 
  else {
    disp = 0;
  }
  image(images[disp], -40, -25);
}

/*
void stop() {
  in.close();
  minim.stop();
  super.stop();
}
*/

