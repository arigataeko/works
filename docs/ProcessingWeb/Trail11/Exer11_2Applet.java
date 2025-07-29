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

public class Exer11_2Applet extends PApplet {

//\u5186\u304c\u3089\u305b\u3093\u3092\u904b\u52d5

Minim minim;  //Minim\u7528\u5909\u6570
AudioPlayer [] sound;  //\u97f3\u58f0\u30d5\u30a1\u30a4\u30eb\u30c7\u30fc\u30bf
AudioPlayer s;  //\u97f3\u58f0\u30d5\u30a1\u30a4\u30eb\u30c7\u30fc\u30bf
int tones = 25; 
float step;
boolean f = false;
int NUM = 60;
float x[] = new float[NUM];
float y[] = new float[NUM];
float r;
float a = 0; //\u89d2\u5ea6(\u5ea6\u5358\u4f4d)
float speed = 2.0f;
float d;
int pre; //\u524d\u306b\u9cf4\u3089\u3057\u305f\u30dc\u30fc\u30eb

public void setup() {
  size(500,500);
  r= width/2;
  colorMode(HSB, 100);
  minim = new Minim(this);  //Minim\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u751f\u6210
  sound = new AudioPlayer[tones];
  for (int i = 1; i <= sound.length; i++) {
    sound[i-1] = minim.loadFile("A/A" + i + ".mp3");
  }     //  \u2191\u97f3\u306e\u30ed\u30fc\u30c9
  step = (width/2) / tones;
  noLoop();
}
public void draw() {
  background(100);
  translate(width/2, height/2);  //\u5ea7\u6a19\u539f\u70b9\u3092\u753b\u9762\u306e\u4e2d\u592e\u3078\u79fb\u52d5
  stroke(0);
  line(0,0,-width/2, 0);
  noStroke();
    //println(x[20] + ", " + y[20] +  " d:" + d );
  for(int i=0; i<NUM; i++){  //a\u306e\u89d2\u5ea6\u306e\u4e2d\u306bNUM\u500b\u306e\u5186\u304c\u5747\u7b49\u306b\u5165\u308b
    x[i] = r/NUM*(NUM-i) * cos(radians(a/NUM*(i+1)));
    y[i] = r/NUM*(NUM-i) * sin(radians(a/NUM*(i+1)));
    fill(map(i, 0, NUM-1, 0, 100), 100, 100);
    d = map(i, NUM-1, 0, 10, 25);
    ellipse(x[i], y[i], d, d); 

    if(x[i] >= -width/2 && x[i] <=0 && y[i] >= -0.5f && y[i]<=0.5f){
      int n = (int)abs(x[i] / step);
      
      if(pre != i){
        // println("i: " + i + "("+ x[i] + ", " + y[i] +  ")  d:" + d + " n:" + n);
        sound[n].rewind();  //\u5148\u982d\u306b\u5dfb\u304d\u623b\u3059
        sound[n].play();  //\u518d\u751f
      }
      pre = i;
    }
  }
  a = a + speed ;  //\u89d2\u5ea6\u3092\u5909\u5316\u3055\u305b\u308b

}

public void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    background(255);
    f = true;
  }
}

  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "Exer11_2Applet" });
  }
}
