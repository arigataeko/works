import processing.core.*; 
import processing.xml.*; 

import ddf.minim.*; 
import ddf.minim.ugens.*; 

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

public class Sample11_4Applet extends PApplet {

// 1\u30aa\u30af\u30bf\u30fc\u30d6\u306e\u30b5\u30a4\u30f3\u6ce2\u3092\u51fa\u3059\u3002




Minim       minim;
AudioOutput out;
Oscil scale;
boolean someOn;
float feq[] = {
    264, 297, 330, 352, 395, 440, 495, 528
}; //\u5404\u97f3\u306e\u632f\u52d5\u6570
CircleButton bu[];
public void setup() {
  size(500, 200);
  smooth();
  minim = new Minim(this);
  bu = new CircleButton[feq.length];
  //\u51fa\u529b\u7528\u306eAudioOutput\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u6e96\u5099
  out = minim.getLineOut();
  // \u30b5\u30a4\u30f3\u6ce2\u306e\u632f\u52d5\u5b50\u3092\u751f\u6210 sine wave Oscil, \u632f\u5e45 0.5
  scale = new Oscil( 0, 1.5f, Waves.SINE );
  for (int i=0; i<feq.length; i++) {
    bu[i] = new CircleButton(40+60*i, height/2, 50, color(200, 0, 0));
  }
  scale.patch(out);
}

public void draw() {
  background(0);
  for (int i=0; i<feq.length; i++) {
    bu[i].update();
    bu[i].display();
    if (bu[i].over) {
       scale.setFrequency(feq[i]);
       someOn = true;
     }
   }
   if(!someOn) {
     scale.setFrequency(0);
   }else{
     someOn = false;
   }
}

class CircleButton {
 int x, y;
 int size;
 boolean over;
 boolean press;
 boolean locked;
 int c;
 
 CircleButton(int xx, int yy, int d, int cc){
   x = xx;
   y = yy;
   size = d;
   c = cc;
 }

 public void update(){
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
 
 public void display() {
   if(over){
     fill(200);
   }else{
     fill(c);
   }
    ellipse(x, y, size, size);
 }

 
}
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "Sample11_4Applet" });
  }
}
