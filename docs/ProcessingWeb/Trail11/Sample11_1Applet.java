import processing.core.*; 
import processing.xml.*; 

import ddf.minim.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Sample11_1Applet extends PApplet {

// Because it uses minim library, it should be created before ver2


 
Minim minim;
AudioPlayer sound;
 
public void setup(){
  size(250, 250);
  fill(225, 0, 0);
  noStroke();
  minim = new Minim(this);
  sound = minim.loadFile("funaJingle.mp3");
  //sound.play();
}
 
public void draw(){
  background(255);
  float d = sound.mix.level() * 2000;
  ellipse(width/2, height/2, d, d);
}
 
public void stop(){
  sound.close();
  minim.stop();
  super.stop();
}

public void mouseClicked(){
  sound.rewind();
  sound.play();
}
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "Sample11_1Applet" });
  }
}
