// 1オクターブのサイン波を出す。

import ddf.minim.*;
import ddf.minim.ugens.*;

Minim       minim;
AudioOutput out;
Oscil scale;
boolean someOn;
float feq[] = {
    264, 297, 330, 352, 395, 440, 495, 528
}; //各音の振動数
CircleButton bu[];
void setup() {
  size(500, 200);
  smooth();
  minim = new Minim(this);
  bu = new CircleButton[feq.length];
  //出力用のAudioOutputオブジェクトを準備
  out = minim.getLineOut();
  // サイン波の振動子を生成 sine wave Oscil, 振幅 0.5
  scale = new Oscil( 0, 1.5, Waves.SINE );
  for (int i=0; i<feq.length; i++) {
    bu[i] = new CircleButton(40+60*i, height/2, 50, color(200, 0, 0));
  }
  scale.patch(out);
}

void draw() {
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

