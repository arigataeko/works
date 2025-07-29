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

public class Exer11_1Applet extends PApplet {

// \u30de\u30a6\u30b9\u30af\u30ea\u30c3\u30af\u3067\u30ad\u30e3\u30e9\u30af\u30bf\u304c\u30b8\u30e3\u30f3\u30d7


Minim minim;  //Minim\u7528\u5909\u6570
AudioPlayer walk, push;  //\u97f3\u58f0\u30d5\u30a1\u30a4\u30eb\u30c7\u30fc\u30bf
PImage[] gazou;   //\u753b\u50cf\u3092\u683c\u7d0d\u3059\u308b\u914d\u5217
PImage jump;
PImage road;
int cell = 5;         //\u753b\u50cf\u306e\u6570
int number = 0;       //\u8868\u793a\u3059\u308b\u753b\u50cf\u306e\u756a\u53f7
int x, y;
int speed = -10; //\u53f3\u304b\u3089\u5de6\u3078\u52d5\u304f
boolean f = false;

public void setup(){
  size(250, 250);
  gazou = new PImage[cell];
  for (int i = 1; i <= gazou.length; i++) {   //\u753b\u50cf\u306e\u30ed\u30fc\u30c9
    gazou[i-1] = loadImage("images/boys/boy" + i + ".png");
  }
  jump =  loadImage("images/boys/boyJump.png");
  road =  loadImage("images/boys/back.png");
  frameRate(5); 
  x = width - jump.width;
  y = height-jump.height;
  image(road, 0, 0);
  image(gazou[0], x, y);
  minim = new Minim(this);  //Minim
  walk = minim.loadFile("sounds/puya.mp3");//\u30d5\u30a1\u30a4\u30eb\u30ed\u30fc\u30c9
  push = minim.loadFile("sounds/puon.mp3");//\u30d5\u30a1\u30a4\u30eb\u30ed\u30fc\u30c9
 // println("just after load:" + walk.position());
  noLoop();
}

public void draw(){   
   image(road, 0, 0);
   number++;  
   number = number%cell;  //\u6b21\u306b\u8868\u793a\u3059\u308b\u753b\u50cf\u306e\u756a\u53f7
   x = x + speed;
   if(x < -gazou[0].width) {
      x = width ;
   }
   if(number==1){
     if(walk.position() != 0)
            walk.rewind();  //\u5148\u982d\u306b\u5dfb\u304d\u623b\u3059
     walk.play();  //\u518d\u751f\u3059\u308b
   }
   image(gazou[number], x, y);
}

public void mousePressed(){
    if(!f) return;
    noLoop();
    image(road, 0, 0);
    y = 0;
    if(push.position() != 0)
          push.rewind();  //\u5148\u982d\u306b\u5dfb\u304d\u623b\u3059
    push.play();  //\u518d\u751f\u3059\u308b
    image(jump, x, y);
}

public void mouseReleased(){
  if(!f) return;
  y = height-jump.height;
  loop(); 
}

public void stop(){   
  walk.close(); //\u97f3\u58f0\u518d\u751f\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u9589\u3058\u308b
  push.close(); //\u97f3\u58f0\u518d\u751f\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u9589\u3058\u308b
  minim.stop();  //Minim\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u30af\u30ea\u30a2
  super.stop();  //\u81ea\u5206\u3067stop()\u3092\u5b9a\u7fa9\u3057\u305f\u6642\u3001\u5fc5\u9808
}

public void keyPressed(){
  if(key == 's' && f){  //\u30ad\u30fc\u5165\u529b\u304cs\u306a\u3089
    noLoop();
    f = false;
  }else if(key == 'g' && !f) {//\u30ad\u30fc\u5165\u529b\u304cg\u306a\u3089
    loop();
    f = true;
  }
}
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "Exer11_1Applet" });
  }
}
