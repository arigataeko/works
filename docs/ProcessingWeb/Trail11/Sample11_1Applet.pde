// Because it uses minim library, it should be created before ver2

import ddf.minim.*;
 
Minim minim;
AudioPlayer sound;
 
void setup(){
  size(250, 250);
  fill(225, 0, 0);
  noStroke();
  minim = new Minim(this);
  sound = minim.loadFile("funaJingle.mp3");
  //sound.play();
}
 
void draw(){
  background(255);
  float d = sound.mix.level() * 2000;
  ellipse(width/2, height/2, d, d);
}
 
void stop(){
  sound.close();
  minim.stop();
  super.stop();
}

void mouseClicked(){
  sound.rewind();
  sound.play();
}
