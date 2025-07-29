/*import ddf.minim.*;

Minim minim;
AudioInput in;*/
float volumeIn;

void setup() {
  size(250,250);
//  minim = new Minim(this);
//  in = minim.getLineIn(Minim.MONO, 512);
  fill(200,0,0);
}

void draw() {
  background(0);
 // volumeIn=in.left.level()*1000;
  volumeIn = mouseX;
  ellipse(width/2, width/2, volumeIn, volumeIn); 
}
/*
void stop() {
  in.close();
  minim.stop();
  super.stop();
}
*/

